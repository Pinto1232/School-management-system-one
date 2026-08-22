<script setup lang="ts">
import type { DataTableColumn, DataTableRow, SortDirection } from '~/types/dashboard'

const props = withDefaults(defineProps<{
  columns: DataTableColumn[]
  rows: DataTableRow[]
  rowKey?: string
  caption?: string
  loading?: boolean
  loadingRows?: number
  emptyTitle?: string
  emptyDescription?: string
  sortKey?: string
  sortDirection?: SortDirection
  hoverable?: boolean
  clickable?: boolean
}>(), {
  rowKey: 'id',
  caption: '',
  loading: false,
  loadingRows: 5,
  emptyTitle: 'Sem registos',
  emptyDescription: 'Não existem dados para apresentar com os filtros atuais.',
  sortKey: '',
  sortDirection: 'asc',
  hoverable: true,
  clickable: false,
})

const emit = defineEmits<{
  sort: [key: string, direction: SortDirection]
  rowClick: [row: DataTableRow]
}>()

const alignmentClasses = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right',
}

const getCellValue = (row: DataTableRow, key: string) => key
  .split('.')
  .reduce<unknown>((value, segment) => {
    if (value && typeof value === 'object' && segment in value) {
      return (value as Record<string, unknown>)[segment]
    }
    return undefined
  }, row)

const displayValue = (value: unknown) => {
  if (value === null || value === undefined || value === '') return 'Não disponível'
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não'
  return String(value)
}

const rowIdentifier = (row: DataTableRow, index: number) => String(row[props.rowKey] ?? index)

const sort = (column: DataTableColumn) => {
  if (!column.sortable) return
  const direction: SortDirection = props.sortKey === column.key && props.sortDirection === 'asc' ? 'desc' : 'asc'
  emit('sort', column.key, direction)
}

const ariaSort = (column: DataTableColumn) => {
  if (!column.sortable || props.sortKey !== column.key) return undefined
  return props.sortDirection === 'asc' ? 'ascending' : 'descending'
}
</script>

<template>
  <div class="min-w-0">
    <div v-if="loading || rows.length" class="overflow-x-auto [scrollbar-color:var(--color-line-strong)_transparent] [scrollbar-width:thin]">
      <table class="w-full min-w-[680px] border-separate border-spacing-0 text-left text-sm">
        <caption v-if="caption" class="sr-only">{{ caption }}</caption>
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="border-b border-line bg-surface px-4 py-3 text-xs font-extrabold tracking-[0.02em] text-ink-soft first:pl-5 last:pr-5"
              :class="alignmentClasses[column.align || 'start']"
              :style="column.width ? { width: column.width } : undefined"
              scope="col"
              :aria-sort="ariaSort(column)"
            >
              <button
                v-if="column.sortable"
                class="inline-flex min-h-8 items-center gap-1.5 rounded-md border-0 bg-transparent p-0 font-inherit text-inherit transition hover:text-ink"
                type="button"
                @click="sort(column)"
              >
                {{ column.label }}
                <Icon
                  :name="sortKey === column.key ? (sortDirection === 'asc' ? 'ph:arrow-up' : 'ph:arrow-down') : 'ph:arrows-down-up'"
                  size="14"
                  aria-hidden="true"
                />
              </button>
              <span v-else>{{ column.label }}</span>
            </th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr v-for="row in loadingRows" :key="row">
            <td v-for="column in columns" :key="column.key" class="border-b border-line px-4 py-4 first:pl-5 last:pr-5">
              <SkeletonLoader :width="column === columns[0] ? '80%' : '65%'" height="0.85rem" />
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIdentifier(row, rowIndex)"
            :class="[
              'group outline-none transition last:[&_td]:border-b-0 focus-visible:bg-brand-50/60',
              hoverable && 'hover:bg-surface',
              clickable && 'cursor-pointer',
            ]"
            :tabindex="clickable ? 0 : undefined"
            @click="clickable && emit('rowClick', row)"
            @keydown.enter="clickable && emit('rowClick', row)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="border-b border-line px-4 py-4 text-ink first:pl-5 last:pr-5"
              :class="alignmentClasses[column.align || 'start']"
            >
              <slot
                :name="`cell-${column.key}`"
                :row="row"
                :value="getCellValue(row, column.key)"
                :column="column"
              >
                <span>{{ displayValue(getCellValue(row, column.key)) }}</span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <slot v-else name="empty">
      <EmptyState :title="emptyTitle" :description="emptyDescription" compact />
    </slot>
  </div>
</template>
