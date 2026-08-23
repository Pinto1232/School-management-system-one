import type { MaybeRefOrGetter } from 'vue'
import type { PackageFeedback, PackagePlan } from '~/types'
import { queryOptions, useMutation, useMutationState, useQuery, useQueryClient } from '@tanstack/vue-query'

interface PackageFeedbackResponse {
  feedback: PackageFeedback[]
}

interface UpdatePackageFeedbackResponse {
  feedback: PackageFeedback
}

interface UpdatePackageFeedbackVariables {
  planKey: string
  liked: boolean
}

type ApiRequest = ReturnType<typeof useApi>['request']

export const packageKeys = {
  all: ['packages'] as const,
  list: () => [...packageKeys.all, 'list'] as const,
  feedback: () => [...packageKeys.all, 'feedback'] as const,
  feedbackFor: (userId: string) => [...packageKeys.feedback(), userId] as const,
  feedbackMutation: () => [...packageKeys.feedback(), 'update'] as const,
}

export const packageQueries = {
  list: (request: ApiRequest) => queryOptions({
    queryKey: packageKeys.list(),
    queryFn: () => request<PackagePlan[]>('/packages', { timeout: 2500, retry: 0 }),
    // Package definitions change infrequently and have a local offline fallback.
    staleTime: 5 * 60_000,
    retry: false,
  }),
  feedback: (request: ApiRequest, userId: string) => queryOptions({
    queryKey: packageKeys.feedbackFor(userId),
    queryFn: async () => {
      const response = await request<PackageFeedbackResponse>('/packages/feedback')
      return response.feedback
    },
    staleTime: 60_000,
  }),
}

export const usePackagePlansQuery = () => {
  const { request } = useApi()
  return useQuery(packageQueries.list(request))
}

export const usePackageFeedback = (
  userId: MaybeRefOrGetter<string | undefined>,
  enabled: MaybeRefOrGetter<boolean>,
) => {
  const { request } = useApi()
  const queryClient = useQueryClient()

  const feedbackQuery = useQuery(computed(() => {
    const currentUserId = toValue(userId) || ''

    return {
      ...packageQueries.feedback(request, currentUserId),
      enabled: toValue(enabled) && Boolean(currentUserId),
    }
  }))

  const updateFeedback = useMutation({
    mutationKey: packageKeys.feedbackMutation(),
    mutationFn: ({ planKey, liked }: UpdatePackageFeedbackVariables) => (
      request<UpdatePackageFeedbackResponse>(
        `/packages/${encodeURIComponent(planKey)}/feedback`,
        { method: 'PUT', body: { liked } },
      )
    ),
    onMutate: async ({ planKey, liked }) => {
      const currentUserId = toValue(userId)
      if (!currentUserId) return

      const queryKey = packageKeys.feedbackFor(currentUserId)
      await queryClient.cancelQueries({ queryKey })

      const currentFeedback = queryClient.getQueryData<PackageFeedback[]>(queryKey) || []
      const previousFeedback = currentFeedback.find(item => item.planKey === planKey)

      queryClient.setQueryData<PackageFeedback[]>(queryKey, [
        ...currentFeedback.filter(item => item.planKey !== planKey),
        { ...previousFeedback, planKey, liked },
      ])

      return { previousFeedback, queryKey }
    },
    onError: (_error, { planKey }, context) => {
      if (!context) return

      queryClient.setQueryData<PackageFeedback[]>(context.queryKey, currentFeedback => [
        ...(currentFeedback || []).filter(item => item.planKey !== planKey),
        ...(context.previousFeedback ? [context.previousFeedback] : []),
      ])
    },
    onSuccess: ({ feedback }, _variables, context) => {
      if (!context) return

      queryClient.setQueryData<PackageFeedback[]>(context.queryKey, currentFeedback => [
        ...(currentFeedback || []).filter(item => item.planKey !== feedback.planKey),
        feedback,
      ])
    },
    onSettled: (_data, _error, _variables, context) => {
      if (!context) return
      return queryClient.invalidateQueries({ queryKey: context.queryKey })
    },
  })

  const pendingFeedback = useMutationState<UpdatePackageFeedbackVariables>({
    filters: {
      mutationKey: packageKeys.feedbackMutation(),
      status: 'pending',
    },
    select: mutation => mutation.state.variables as UpdatePackageFeedbackVariables,
  })

  const favourites = computed<Record<string, boolean>>(() => Object.fromEntries(
    (feedbackQuery.data.value || []).map(feedback => [feedback.planKey, feedback.liked]),
  ))
  const pendingPlanKeys = computed(() => new Set(
    pendingFeedback.value.map(feedback => feedback.planKey),
  ))

  return {
    feedbackQuery,
    favourites,
    pendingPlanKeys,
    updateFeedback,
  }
}
