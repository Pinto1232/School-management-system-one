<script setup lang="ts">
const props = withDefaults(defineProps<{
  page: number
  pageSize: number
  total: number
  disabled?: boolean
  label?: string
}>(), {
  disabled: false,
  label: 'Paginação da tabela',
})

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const safePage = computed(() => Math.min(Math.max(props.page, 1), pageCount.value))
const firstItem = computed(() => props.total === 0 ? 0 : (safePage.value - 1) * props.pageSize + 1)
const lastItem = computed(() => Math.min(safePage.value * props.pageSize, props.total))

const pages = computed<Array<number | 'ellipsis-start' | 'ellipsis-end'>>(() => {
  if (pageCount.value <= 7) return Array.from({ length: pageCount.value }, (_, index) => index + 1)

  const values: Array<number | 'ellipsis-start' | 'ellipsis-end'> = [1]
  const start = Math.max(2, safePage.value - 1)
  const end = Math.min(pageCount.value - 1, safePage.value + 1)

  if (start > 2) values.push('ellipsis-start')
  for (let page = start; page <= end; page += 1) values.push(page)
  if (end < pageCount.value - 1) values.push('ellipsis-end')
  values.push(pageCount.value)
  return values
})

const goTo = (page: number) => {
  if (props.disabled || page < 1 || page > pageCount.value || page === safePage.value) return
  emit('update:page', page)
}
</script>

<template>
  <nav class="flex flex-col gap-3 border-t border-line px-4 py-3 min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between min-[721px]:px-5" :aria-label="label">
    <p class="m-0 text-sm text-ink-soft">
      <span class="font-bold text-ink">{{ firstItem }}-{{ lastItem }}</span> de {{ total }} registos
    </p>

    <div class="flex flex-wrap items-center gap-1">
      <button
        class="grid size-9 place-items-center rounded-control border border-line bg-surface-strong text-ink transition hover:border-brand-400 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-45"
        type="button"
        aria-label="Página anterior"
        :disabled="disabled || safePage <= 1"
        @click="goTo(safePage - 1)"
      >
        <Icon name="ph:caret-left" size="17" aria-hidden="true" />
      </button>

      <template v-for="item in pages" :key="item">
        <span v-if="typeof item !== 'number'" class="grid size-9 place-items-center text-sm text-ink-soft" aria-hidden="true">…</span>
        <button
          v-else
          :class="[
            'grid size-9 place-items-center rounded-control border text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-45',
            item === safePage
              ? 'border-brand-700 bg-brand-700 text-[#f7fffd]'
              : 'border-line bg-surface-strong text-ink hover:border-brand-400 hover:bg-brand-50',
          ]"
          type="button"
          :aria-label="`Página ${item}`"
          :aria-current="item === safePage ? 'page' : undefined"
          :disabled="disabled"
          @click="goTo(item)"
        >
          {{ item }}
        </button>
      </template>

      <button
        class="grid size-9 place-items-center rounded-control border border-line bg-surface-strong text-ink transition hover:border-brand-400 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-45"
        type="button"
        aria-label="Página seguinte"
        :disabled="disabled || safePage >= pageCount"
        @click="goTo(safePage + 1)"
      >
        <Icon name="ph:caret-right" size="17" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>
