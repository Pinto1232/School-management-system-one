<script setup lang="ts">
import { useId } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  name?: string
  hint?: string
  error?: string
  required?: boolean
}>(), {
  name: '',
  hint: '',
  error: '',
  required: false,
})

const uid = useId()
const inputId = computed(() => props.name || `field-${uid}`)
const hintId = computed(() => props.hint ? `${inputId.value}-hint` : undefined)
const errorId = computed(() => props.error ? `${inputId.value}-error` : undefined)
const describedBy = computed(() => [hintId.value, errorId.value].filter(Boolean).join(' ') || undefined)
</script>

<template>
  <div class="grid gap-2">
    <label :for="inputId" class="text-sm font-bold text-ink">
      {{ label }}
      <span v-if="required" class="text-danger" aria-hidden="true">*</span>
      <span v-if="required" class="sr-only">(obrigatório)</span>
    </label>

    <slot
      :id="inputId"
      :described-by="describedBy"
      :invalid="Boolean(error)"
      :required="required"
    />

    <p v-if="hint" :id="hintId" class="m-0 text-xs leading-5 text-ink-soft">{{ hint }}</p>
    <p v-if="error" :id="errorId" class="m-0 flex items-start gap-1.5 text-xs font-semibold leading-5 text-danger" role="alert">
      <Icon class="mt-0.5 shrink-0" name="ph:warning-circle" size="15" aria-hidden="true" />
      {{ error }}
    </p>
  </div>
</template>
