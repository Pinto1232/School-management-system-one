<script setup lang="ts">
type QuickActionTone = 'navy' | 'brand' | 'outline'

interface QuickAction {
  label: string
  icon: string
  tone?: QuickActionTone
  disabled?: boolean
}

withDefaults(defineProps<{
  actions: QuickAction[]
  title?: string
}>(), {
  title: 'Ações rápidas',
})

const emit = defineEmits<{
  select: [label: string]
}>()

const actionClass = 'button min-h-14 w-full justify-center gap-2.5 px-4 text-sm font-medium min-[480px]:min-h-16 min-[480px]:gap-3 min-[480px]:px-5 min-[480px]:text-base'

const toneClasses: Record<QuickActionTone, string> = {
  navy: 'border-navy-900 bg-navy-900 text-white hover:border-navy-800 hover:bg-navy-800',
  brand: 'border-brand-500 bg-brand-500 text-brand-variation hover:border-brand-600 hover:bg-brand-600',
  outline: 'border-line-strong bg-surface-strong text-ink hover:border-brand-500 hover:bg-brand-50 hover:text-brand-800',
}
</script>

<template>
  <DashboardSection :title="title" title-weight="semibold" :elevated="false" :bordered="false">
    <div class="grid gap-3 min-[560px]:grid-cols-2 min-[1180px]:grid-cols-3">
      <button
        v-for="action in actions"
        :key="action.label"
        :class="[actionClass, toneClasses[action.tone || 'outline']]"
        type="button"
        :disabled="action.disabled"
        @click="emit('select', action.label)"
      >
        <Icon :name="action.icon" size="24" aria-hidden="true" />
        <span>{{ action.label }}</span>
      </button>
    </div>
  </DashboardSection>
</template>
