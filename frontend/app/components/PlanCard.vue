<script setup lang="ts">
import type { PackagePlan } from '~/types'

const props = defineProps<{
  plan: PackagePlan
  featured?: boolean
}>()

const emit = defineEmits<{
  select: [plan: PackagePlan]
}>()

const featureLabels = computed(() => {
  if (Array.isArray(props.plan.features)) return props.plan.features
  const source = props.plan.features && typeof props.plan.features === 'object'
    ? props.plan.features
    : props.plan

  return Object.entries(source)
    .filter(([key, value]) => value === true && !['_id', 'id', 'name', 'price', '__v'].includes(key))
    .map(([key]) => key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, value => value.toUpperCase()))
})
</script>

<template>
  <article class="plan-card" :class="{ 'plan-card--featured': featured }">
    <h3>{{ plan.name }}</h3>
    <p class="plan-card__description">{{ plan.description || 'Flexible tools for your school community.' }}</p>
    <div class="plan-card__price">
      R{{ Number(plan.price || 0).toLocaleString('en-ZA') }}
      <span>/ month</span>
    </div>
    <ul class="feature-list">
      <li v-for="feature in featureLabels" :key="feature">
        <Icon name="ph:check-circle-fill" size="19" aria-hidden="true" />
        <span>{{ feature }}</span>
      </li>
    </ul>
    <button
      class="button"
      :class="featured ? 'button--primary' : 'button--secondary'"
      type="button"
      style="width: 100%"
      @click="emit('select', plan)"
    >
      Choose {{ plan.name }}
    </button>
  </article>
</template>
