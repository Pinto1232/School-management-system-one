<script setup lang="ts">
import type { PackagePlan } from '~/types'

const props = defineProps<{
  open: boolean
  plan: PackagePlan | null
  inCart: boolean
}>()

const emit = defineEmits<{
  close: []
  add: [plan: PackagePlan]
  remove: []
}>()

const drawer = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const featureLabels = computed(() => {
  if (!props.plan) return []
  if (Array.isArray(props.plan.features)) return props.plan.features
  const source = props.plan.features && typeof props.plan.features === 'object'
    ? props.plan.features
    : props.plan

  return Object.entries(source)
    .filter(([key, value]) => value === true && !['_id', 'id', 'name', 'price', '__v'].includes(key))
    .map(([key]) => translateFeatureLabel(key))
})

const planPrice = computed(() => Number(props.plan?.price || 0).toLocaleString('pt-PT'))

const closeDrawer = () => emit('close')

const addPlan = () => {
  if (props.plan) emit('add', props.plan)
}

const trapFocus = (event: KeyboardEvent) => {
  if (!drawer.value) return
  const focusable = Array.from(drawer.value.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
  ))
  if (!focusable.length) return

  const first = focusable[0]!
  const last = focusable.at(-1)!
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(() => props.open, async (isOpen) => {
  if (!import.meta.client) return
  if (isOpen) {
    previouslyFocused = document.activeElement as HTMLElement | null
    document.body.classList.add('has-plan-drawer')
    document.querySelector('#__nuxt')?.setAttribute('inert', '')
    await nextTick()
    drawer.value?.focus()
  } else {
    document.body.classList.remove('has-plan-drawer')
    document.querySelector('#__nuxt')?.removeAttribute('inert')
    previouslyFocused?.focus()
  }
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.classList.remove('has-plan-drawer')
  document.querySelector('#__nuxt')?.removeAttribute('inert')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="plan-drawer">
      <div v-if="open && plan" class="plan-drawer-layer">
        <button class="plan-drawer-backdrop" type="button" aria-label="Fechar detalhes do pacote" @click="closeDrawer" />

        <aside
          ref="drawer"
          class="plan-drawer"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`plan-drawer-${plan.id || plan._id || plan.name}`"
          tabindex="-1"
          @keydown.esc="closeDrawer"
          @keydown.tab="trapFocus"
        >
          <header class="plan-drawer__header">
            <div>
              <span>Detalhes do pacote</span>
              <h2 :id="`plan-drawer-${plan.id || plan._id || plan.name}`">{{ plan.name }}</h2>
            </div>
            <button class="icon-button" type="button" aria-label="Fechar detalhes do pacote" @click="closeDrawer">
              <Icon name="ph:x" size="22" aria-hidden="true" />
            </button>
          </header>

          <div class="plan-drawer__body">
            <p class="plan-drawer__description">
              {{ plan.description || 'Ferramentas flexíveis para a sua comunidade escolar.' }}
            </p>

            <div class="plan-drawer__price">
              <span>R{{ planPrice }}</span>
              <small>por mês</small>
            </div>

            <section class="plan-drawer__features" aria-labelledby="plan-features-title">
              <div class="plan-drawer__section-heading">
                <span class="plan-drawer__feature-icon">
                  <Icon name="ph:sparkle" size="21" aria-hidden="true" />
                </span>
                <div>
                  <h3 id="plan-features-title">Incluído no {{ plan.name }}</h3>
                  <p>Tudo o que a sua escola recebe com este pacote.</p>
                </div>
              </div>

              <ul>
                <li v-for="feature in featureLabels" :key="feature">
                  <Icon name="ph:check-circle-fill" size="21" aria-hidden="true" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </section>

            <div class="plan-drawer__assurance">
              <Icon name="ph:shield-check" size="23" aria-hidden="true" />
              <div>
                <strong>Reveja antes de continuar</strong>
                <p>Adicionar este pacote ao carrinho não processa qualquer pagamento.</p>
              </div>
            </div>
          </div>

          <footer class="plan-drawer__footer">
            <template v-if="inCart">
              <div class="plan-drawer__cart-status" role="status">
                <Icon name="ph:check-circle-fill" size="20" aria-hidden="true" />
                O pacote {{ plan.name }} está no seu carrinho
              </div>
              <p class="plan-drawer__cart-hint">
                Utilize o ícone do carrinho na navegação para rever a compra.
              </p>
              <button class="button button--primary" type="button" @click="closeDrawer">
                Concluído
              </button>
              <button class="button button--secondary" type="button" @click="emit('remove')">
                Remover do carrinho
              </button>
            </template>
            <template v-else>
              <button class="button button--primary" type="button" @click="addPlan">
                <Icon name="ph:shopping-cart-simple" size="20" aria-hidden="true" />
                Adicionar ao carrinho
              </button>
              <button class="button button--secondary" type="button" @click="closeDrawer">
                Continuar a comparar
              </button>
            </template>
          </footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>
