<script setup lang="ts">
interface AttendancePoint {
  label: string
  value: number
  current?: boolean
}

interface LevelDistributionItem {
  label: string
  count: string | number
  percentage: number
  color: string
}

const props = withDefaults(defineProps<{
  attendance: AttendancePoint[]
  levels: LevelDistributionItem[]
  totalStudents: string | number
  academicAverage: string | number
  detailsTo?: string
}>(), {
  detailsTo: '/dashboard/attendance',
})

const chartTicks = [100, 75, 50, 25, 0]

const barHeight = (value: number) => `${Math.min(100, Math.max(0, value))}%`

const donutGradient = computed(() => {
  let start = 0
  const segments = props.levels.map(item => {
    const end = Math.min(100, start + Math.max(0, item.percentage))
    const segment = `${item.color} ${start}% ${end}%`
    start = end
    return segment
  })

  if (start < 100) segments.push(`var(--color-surface-muted) ${start}% 100%`)
  return `conic-gradient(${segments.join(', ')})`
})

const attendanceSummary = computed(() => props.attendance
  .map(point => `${point.label}: ${point.value}%`)
  .join(', '))

const levelSummary = computed(() => props.levels
  .map(item => `${item.label}: ${item.percentage}%`)
  .join(', '))
</script>

<template>
  <div class="grid min-w-0 gap-3 min-[641px]:gap-4 min-[1360px]:grid-cols-[minmax(0,2fr)_minmax(19rem,0.95fr)]">
    <DashboardSection class="h-full" title="Frequência semanal" title-weight="semibold" :elevated="false" :bordered="false">
      <template #actions>
        <NuxtLink
          class="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-xs font-bold tracking-[0.08em] whitespace-nowrap text-brand-600 uppercase transition hover:bg-brand-50 hover:text-brand-800 active:translate-y-px min-[1280px]:min-h-14 min-[1600px]:min-h-15"
          :to="detailsTo"
        >
          Ver detalhes
          <Icon name="ph:caret-right" size="15" aria-hidden="true" />
        </NuxtLink>
      </template>

      <div
        class="grid h-[280px] min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_2rem] gap-x-2 min-[480px]:h-[320px] min-[480px]:grid-cols-[2.8rem_minmax(0,1fr)] min-[480px]:gap-x-3 min-[721px]:h-[390px]"
        role="img"
        :aria-label="`Frequência semanal. ${attendanceSummary}`"
      >
        <div class="relative row-start-1" aria-hidden="true">
          <span
            v-for="tick in chartTicks"
            :key="tick"
            class="absolute right-0 -translate-y-1/2 text-[0.7rem] font-medium text-ink-soft min-[480px]:text-xs"
            :style="{ top: `${100 - tick}%` }"
          >
            {{ tick }}%
          </span>
        </div>

        <div class="relative row-start-1 min-w-0 border-b border-line">
          <span
            v-for="tick in chartTicks.slice(0, -1)"
            :key="tick"
            class="absolute inset-x-0 border-t border-dashed border-line/75"
            :style="{ top: `${100 - tick}%` }"
            aria-hidden="true"
          />

          <div class="absolute inset-0 grid grid-cols-5 items-end gap-[clamp(0.4rem,1.5vw,1.5rem)] px-[clamp(0.25rem,1vw,1rem)]">
            <span
              v-for="point in attendance"
              :key="point.label"
              :class="[
                'mx-auto block w-[min(4.75rem,68%)] min-w-5 rounded-t-lg transition-[height] duration-500 motion-reduce:transition-none',
                point.current ? 'bg-brand-500' : 'bg-line-strong/80',
              ]"
              :style="{ height: barHeight(point.value) }"
              :title="`${point.label}: ${point.value}%`"
            />
          </div>
        </div>

        <div class="col-start-2 row-start-2 grid grid-cols-5 gap-[clamp(0.25rem,1.5vw,1.5rem)] px-[clamp(0.125rem,1vw,1rem)] pt-3 text-center text-xs text-ink min-[480px]:text-sm">
          <span
            v-for="point in attendance"
            :key="point.label"
            :class="point.current && 'font-extrabold'"
          >
            {{ point.label }}
          </span>
        </div>
      </div>
    </DashboardSection>

    <DashboardSection class="h-full" title="Distribuição por nível" title-weight="semibold" :elevated="false" :bordered="false">
      <div class="grid h-full content-start">
        <div
          class="relative mx-auto grid size-44 place-items-center rounded-full min-[480px]:size-48 min-[721px]:size-56 min-[1360px]:size-[15.5rem]"
          :style="{ background: donutGradient }"
          role="img"
          :aria-label="`Distribuição de ${totalStudents} alunos. ${levelSummary}`"
        >
          <div class="grid size-[72%] place-content-center rounded-full bg-surface-strong text-center">
            <strong class="font-header text-[clamp(2rem,3vw,2.6rem)] font-black leading-none tracking-[-0.05em] text-ink">
              {{ totalStudents }}
            </strong>
            <span class="mt-2 text-xs font-semibold tracking-[0.04em] text-ink">Total alunos</span>
          </div>
        </div>

        <ul class="mt-6 grid gap-3.5" aria-label="Distribuição dos alunos por nível">
          <li
            v-for="level in levels"
            :key="level.label"
            class="grid grid-cols-[0.75rem_minmax(0,1fr)_auto_auto] items-center gap-x-2 text-sm min-[480px]:gap-x-3"
          >
            <span class="size-3 rounded-full" :style="{ backgroundColor: level.color }" aria-hidden="true" />
            <span class="min-w-0 text-ink-soft">{{ level.label }}</span>
            <span class="font-semibold text-ink">{{ level.count }}</span>
            <span class="w-9 text-right font-extrabold min-[480px]:w-10" :style="{ color: level.color }">{{ level.percentage }}%</span>
          </li>
        </ul>

        <div class="mt-7 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 min-[420px]:flex-row min-[420px]:items-end min-[420px]:gap-5">
          <div>
            <p class="m-0 text-xs font-bold tracking-[0.06em] text-ink uppercase">Aproveitamento académico</p>
            <p class="mt-1 mb-0 text-sm text-ink-soft">Média global</p>
          </div>
          <p class="m-0 shrink-0 font-header text-3xl font-black leading-none tracking-[-0.045em] text-ink">
            {{ academicAverage }}<span class="ml-1 text-sm font-medium tracking-normal text-ink-soft">/20</span>
          </p>
        </div>
      </div>
    </DashboardSection>
  </div>
</template>
