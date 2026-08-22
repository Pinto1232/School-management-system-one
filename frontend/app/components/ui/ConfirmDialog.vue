<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'default' | 'danger'
  loading?: boolean
  closeOnConfirm?: boolean
}>(), {
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  tone: 'default',
  loading: false,
  closeOnConfirm: true,
})

const emit = defineEmits<{
  confirm: []
}>()

const open = defineModel<boolean>({ default: false })

const confirm = () => {
  if (props.loading) return
  emit('confirm')
  if (props.closeOnConfirm) open.value = false
}
</script>

<template>
  <BaseModal v-model="open" :title="title" size="sm" :close-on-backdrop="!loading" :close-on-escape="!loading" :show-close="!loading">
    <div class="flex items-start gap-4">
      <span :class="['grid size-11 shrink-0 place-items-center rounded-xl', tone === 'danger' ? 'bg-danger-soft text-danger' : 'bg-brand-100 text-brand-800']">
        <Icon :name="tone === 'danger' ? 'ph:warning' : 'ph:question'" size="23" aria-hidden="true" />
      </span>
      <p class="m-0 text-sm leading-6 text-ink-soft">{{ description }}</p>
    </div>

    <template #footer="{ close }">
      <button class="button button--secondary" type="button" :disabled="loading" @click="close">{{ cancelLabel }}</button>
      <button :class="['button', tone === 'danger' ? 'button--danger' : 'button--primary']" type="button" :disabled="loading" @click="confirm">
        <Icon v-if="loading" class="animate-spin motion-reduce:animate-none" name="ph:spinner-gap" size="18" aria-hidden="true" />
        {{ loading ? 'A processar' : confirmLabel }}
      </button>
    </template>
  </BaseModal>
</template>
