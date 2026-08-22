<script setup lang="ts">
import type { ToastTone } from '~/types/dashboard'

const { toasts, remove } = useToast()
const timers = new Map<string, ReturnType<typeof setTimeout>>()

const icons: Record<ToastTone, string> = {
  info: 'ph:info',
  success: 'ph:check-circle',
  warning: 'ph:warning',
  error: 'ph:warning-circle',
}

const toneClasses: Record<ToastTone, string> = {
  info: 'border-navy-200 bg-surface-strong text-navy-700',
  success: 'border-success/25 bg-surface-strong text-success',
  warning: 'border-warning/25 bg-surface-strong text-warning',
  error: 'border-danger/25 bg-surface-strong text-danger',
}

const clearTimer = (id: string) => {
  const timer = timers.get(id)
  if (timer) clearTimeout(timer)
  timers.delete(id)
}

const dismiss = (id: string) => {
  clearTimer(id)
  remove(id)
}

watch(toasts, (messages) => {
  if (!import.meta.client) return

  const activeIds = new Set(messages.map(message => message.id))
  for (const id of timers.keys()) {
    if (!activeIds.has(id)) clearTimer(id)
  }

  for (const message of messages) {
    if (message.duration <= 0 || timers.has(message.id)) continue
    timers.set(message.id, setTimeout(() => dismiss(message.id), message.duration))
  }
}, { deep: true, immediate: true })

onBeforeUnmount(() => {
  for (const timer of timers.values()) clearTimeout(timer)
  timers.clear()
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="pointer-events-none fixed right-3 bottom-3 z-[100] grid w-[min(390px,calc(100vw-1.5rem))] gap-2.5 print:hidden" aria-label="Notificações">
        <TransitionGroup name="toast">
          <article
            v-for="toast in toasts"
            :key="toast.id"
            :class="['pointer-events-auto grid grid-cols-[auto_1fr_auto] items-start gap-3 rounded-surface border p-4 text-ink shadow-panel', toneClasses[toast.tone]]"
            :role="toast.tone === 'error' ? 'alert' : 'status'"
          >
            <Icon class="mt-0.5 shrink-0" :name="icons[toast.tone]" size="21" aria-hidden="true" />
            <div class="min-w-0">
              <h2 class="m-0 text-sm font-extrabold text-ink">{{ toast.title }}</h2>
              <p v-if="toast.description" class="mt-1 mb-0 text-sm leading-5 text-ink-soft">{{ toast.description }}</p>
            </div>
            <button class="grid size-8 place-items-center rounded-md border-0 bg-transparent text-ink-soft transition hover:bg-surface-muted hover:text-ink" type="button" :aria-label="`Fechar notificação: ${toast.title}`" @click="dismiss(toast.id)">
              <Icon name="ph:x" size="17" aria-hidden="true" />
            </button>
          </article>
        </TransitionGroup>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active {
    transition: none;
  }
}
</style>
