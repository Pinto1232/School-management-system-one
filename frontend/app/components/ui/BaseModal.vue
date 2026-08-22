<script setup lang="ts">
import { nextTick, useId } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  showClose?: boolean
}>(), {
  description: '',
  size: 'md',
  closeOnBackdrop: true,
  closeOnEscape: true,
  showClose: true,
})

const emit = defineEmits<{
  afterOpen: []
  afterClose: []
}>()

const open = defineModel<boolean>({ default: false })
const dialog = ref<HTMLElement | null>(null)
const titleId = `modal-title-${useId()}`
const descriptionId = `modal-description-${useId()}`
let previousFocus: HTMLElement | null = null
let previousBodyOverflow = ''

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
}

const close = () => {
  open.value = false
}

const handleBackdrop = () => {
  if (props.closeOnBackdrop) close()
}

const focusableElements = () => Array.from(dialog.value?.querySelectorAll<HTMLElement>(
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
) || [])

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape) {
    event.preventDefault()
    close()
    return
  }

  if (event.key !== 'Tab') return
  const focusable = focusableElements()
  if (!focusable.length) {
    event.preventDefault()
    dialog.value?.focus()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

watch(open, async (isOpen) => {
  if (!import.meta.client) return

  if (isOpen) {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    await nextTick()
    const autofocus = dialog.value?.querySelector<HTMLElement>('[autofocus]')
    ;(autofocus || focusableElements()[0] || dialog.value)?.focus()
    emit('afterOpen')
    return
  }

  document.body.style.overflow = previousBodyOverflow
  previousFocus?.focus()
  previousFocus = null
  emit('afterClose')
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="open"
          class="fixed inset-0 z-[90] grid overflow-y-auto bg-navy-900/55 p-3 backdrop-blur-sm print:hidden min-[641px]:place-items-center min-[641px]:p-6"
          @mousedown.self="handleBackdrop"
        >
          <section
            ref="dialog"
            :class="['my-auto w-full rounded-surface border border-line bg-surface-strong shadow-panel outline-none', sizeClasses[size]]"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            :aria-describedby="description ? descriptionId : undefined"
            tabindex="-1"
            @keydown="handleKeydown"
          >
            <header class="flex items-start justify-between gap-4 border-b border-line px-5 py-4 min-[721px]:px-6">
              <div class="min-w-0">
                <h2 :id="titleId" class="m-0 text-xl font-extrabold text-ink">{{ title }}</h2>
                <p v-if="description" :id="descriptionId" class="mt-1.5 mb-0 text-sm leading-6 text-ink-soft">{{ description }}</p>
              </div>
              <button
                v-if="showClose"
                class="grid size-9 shrink-0 place-items-center rounded-control border border-line bg-surface text-ink-soft transition hover:border-brand-400 hover:bg-brand-50 hover:text-ink active:translate-y-px"
                type="button"
                aria-label="Fechar janela"
                @click="close"
              >
                <Icon name="ph:x" size="19" aria-hidden="true" />
              </button>
            </header>

            <div class="px-5 py-5 min-[721px]:px-6">
              <slot :close="close" />
            </div>

            <footer v-if="$slots.footer" class="flex flex-col-reverse gap-2 border-t border-line px-5 py-4 min-[481px]:flex-row min-[481px]:justify-end min-[721px]:px-6">
              <slot name="footer" :close="close" />
            </footer>
          </section>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 180ms ease;
}

.modal-enter-active section,
.modal-leave-active section {
  transition: opacity 180ms ease, transform 180ms ease;
}

.modal-enter-from,
.modal-leave-to,
.modal-enter-from section,
.modal-leave-to section {
  opacity: 0;
}

.modal-enter-from section,
.modal-leave-to section {
  transform: translateY(10px) scale(0.985);
}

@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active section,
  .modal-leave-active section {
    transition: none;
  }
}
</style>
