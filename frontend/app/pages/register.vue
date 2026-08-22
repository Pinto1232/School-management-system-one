<script setup lang="ts">
import type { PackagePlan } from '~/types'

const { authError, initialiseAuth, isAuthenticated, ready, register } = useAuth()
const { cartItem, cartInitialised, initialiseCart } = useSchoolCart()
const selectedPlan = computed<PackagePlan | null>(() => cartItem.value)
const submitting = ref(false)
const message = ref('')

const beginRegistration = async () => {
  message.value = ''
  if (!selectedPlan.value) {
    message.value = 'Escolha um pacote e adicione-o ao carrinho antes de criar uma conta.'
    return
  }

  submitting.value = true
  try {
    sessionStorage.setItem('registration-plan', JSON.stringify({
      id: selectedPlan.value.id || selectedPlan.value._id,
      name: selectedPlan.value.name,
    }))
    await register('/subscribe')
  } catch {
    message.value = 'Não foi possível abrir o registo seguro do Keycloak.'
    submitting.value = false
  }
}

onMounted(async () => {
  initialiseCart()
  await initialiseAuth()
  if (isAuthenticated.value && selectedPlan.value) await navigateTo('/subscribe')
})

useSeoMeta({ title: 'Criar conta', robots: 'noindex' })
</script>

<template>
  <section class="auth-shell">
    <div class="auth-shell__visual">
      <img src="/images/background-01.webp" alt="Uma professora a apoiar alunos em atividades digitais" width="1200" height="900">
      <div class="auth-shell__visual-copy">
        <h1>Reúna a sua escola num único espaço de trabalho.</h1>
        <p>Crie a conta do administrador da escola, confirme o plano e depois convide a sua equipa através do Keycloak.</p>
      </div>
    </div>
    <div class="auth-shell__form">
      <div class="auth-card">
        <div class="auth-card__header">
          <h2>Criar conta</h2>
          <p v-if="selectedPlan">Continue com o plano {{ selectedPlan.name }} através do registo seguro.</p>
          <p v-else>Escolha um pacote antes de criar a conta da sua escola.</p>
        </div>

        <AppSkeleton v-if="!cartInitialised" height="300px" />

        <div v-else-if="!selectedPlan" class="registration-plan-required">
          <span><Icon name="ph:shopping-cart-simple" size="30" aria-hidden="true" /></span>
          <h3>O seu carrinho está vazio</h3>
          <p>Compare os pacotes escolares e adicione primeiro um pacote ao carrinho.</p>
          <NuxtLink class="button button--primary" to="/#plans">Escolher um pacote</NuxtLink>
        </div>

        <div v-else class="form-stack">
          <AppAlert v-if="authError || message" type="error" :message="message || authError" />

          <div class="registration-plan-summary">
            <span><Icon name="ph:shopping-cart-simple-fill" size="21" aria-hidden="true" /></span>
            <div><small>Pacote no carrinho</small><strong>{{ selectedPlan.name }}</strong></div>
            <b>R{{ Number(selectedPlan.price || 0).toLocaleString('pt-PT') }}<small>/mês</small></b>
          </div>

          <p>O Keycloak irá criar a conta inicial do administrador. Os restantes utilizadores devem ser associados ao mesmo identificador de escola.</p>
          <button class="button button--primary" type="button" :disabled="!ready || submitting" style="width: 100%" @click="beginRegistration">
            <Icon v-if="submitting || !ready" name="ph:circle-notch" size="19" aria-hidden="true" />
            {{ submitting ? 'A abrir o registo...' : 'Continuar para criar conta' }}
          </button>
        </div>

        <p class="auth-card__footer">Já tem uma conta? <NuxtLink class="text-link" to="/login">Iniciar sessão</NuxtLink></p>
      </div>
    </div>
  </section>
</template>
