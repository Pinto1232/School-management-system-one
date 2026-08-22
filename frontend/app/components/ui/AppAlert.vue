<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'error' | 'success' | 'info'
  message: string
}>(), {
  type: 'info',
})
</script>

<template>
  <div class="alert" :class="`alert--${type}`" role="status">
    <Icon
      :name="type === 'error' ? 'ph:warning-circle' : type === 'success' ? 'ph:check-circle' : 'ph:info'"
      size="20"
      aria-hidden="true"
    />
    <span>{{ message }}</span>
  </div>
</template>
