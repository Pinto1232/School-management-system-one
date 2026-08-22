<script setup lang="ts">
import type { PackagePlan } from '~/types'

const props = withDefaults(defineProps<{
  plan: PackagePlan
  featured?: boolean
  inCart?: boolean
  variant?: 'inline' | 'docked'
}>(), {
  featured: false,
  inCart: false,
  variant: 'inline',
})

const emit = defineEmits<{
  view: [plan: PackagePlan]
}>()

const generatedFallback = computed(() => props.featured
  ? '/images/plan-complete.webp'
  : '/images/plan-essential.webp')

const planImage = computed(() => {
  if (typeof props.plan.image === 'string' && props.plan.image.trim()) return props.plan.image

  const remoteImage = props.plan.images?.find(image => typeof image?.url === 'string' && image.url.trim())
  return remoteImage?.url || generatedFallback.value
})

const statusLabel = computed(() => {
  if (props.inCart) return 'Selecionado'
  return props.featured ? 'Mais popular' : 'Para começar'
})

const actionLabel = computed(() => 'Ver plano')

const useFallbackImage = (event: Event) => {
  const image = event.currentTarget as HTMLImageElement
  if (image.src.endsWith(generatedFallback.value)) return
  image.src = generatedFallback.value
}
</script>

<template>
  <div
    class="plan-card-shell"
    :class="[`plan-card-shell--${variant}`, { 'plan-card-shell--selected': inCart }]"
  >
    <article class="plan-card" :class="{ 'plan-card--featured': featured }">
      <div class="plan-card__media">
        <img
          :src="planImage"
          :alt="`Espaço de trabalho do plano escolar ${plan.name}`"
          width="1402"
          height="1254"
          loading="lazy"
          decoding="async"
          @error="useFallbackImage"
        >
        <span class="plan-card__status">{{ statusLabel }}</span>
        <span class="plan-card__favourite" aria-hidden="true">
          <Icon v-if="inCart" name="ph:check-bold" size="24" />
          <Icon v-else name="ph:heart-fill" size="24" />
        </span>
      </div>

      <div class="plan-card__body">
        <h3>{{ plan.name }}</h3>
        <p class="plan-card__description">
          {{ plan.description || 'Ferramentas flexíveis para a sua comunidade escolar.' }}
        </p>

        <div class="plan-card__footer">
          <div class="plan-card__price">
            R{{ Number(plan.price || 0).toLocaleString('pt-PT') }}
            <span>/ mês</span>
          </div>
          <button
            class="plan-card__inline-action"
            type="button"
            @click="emit('view', plan)"
          >
            {{ actionLabel }}
            <Icon name="ph:arrow-right" size="19" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>

    <span
      v-if="variant === 'docked'"
      class="plan-card__side-favourite"
      aria-hidden="true"
    >
      <Icon name="ph:heart-fill" size="24" />
    </span>

    <button
      v-if="variant === 'docked'"
      class="plan-card__dock-action"
      type="button"
      :aria-label="`${actionLabel}: ${plan.name}`"
      @click="emit('view', plan)"
    >
      <Icon v-if="inCart" name="ph:check-bold" size="31" aria-hidden="true" />
      <Icon v-else name="ph:shopping-cart-simple" size="31" aria-hidden="true" />
    </button>
  </div>
</template>
