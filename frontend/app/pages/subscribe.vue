<script setup lang="ts">
import { fallbackPlans } from '~/data/school'
import type { PackagePlan } from '~/types'

type BillingCycle = 'monthly' | 'yearly'
type PaymentMethod = 'card' | 'paypal' | 'payu'
type CheckoutStep = 'payment' | 'review'
type CardField = 'cardName' | 'cardNumber' | 'expiry' | 'cvv'

const checkoutTop = ref<HTMLElement | null>(null)
const { cartItem, initialiseCart, clearCart } = useSchoolCart()
const { initialiseAuth, isAuthenticated, login, user } = useAuth()
const plan = ref<PackagePlan>(fallbackPlans[1]!)
const billing = ref<BillingCycle>('monthly')
const paymentMethod = ref<PaymentMethod>('card')
const currentStep = ref<CheckoutStep>('payment')
const autoRenew = ref(true)
const confirmed = ref(false)
const registration = ref<{ firstName?: string; lastName?: string; email?: string }>({})
const form = reactive({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
const errors = reactive<Partial<Record<CardField | 'confirmation', string>>>({})
const submitting = ref(false)
const errorMessage = ref('')

const planFeatures = computed(() => {
  if (Array.isArray(plan.value.features)) return plan.value.features
  const source = plan.value.features && typeof plan.value.features === 'object'
    ? plan.value.features
    : plan.value
  return Object.entries(source)
    .filter(([key, value]) => value === true && !['_id', 'id', 'name', 'price', '__v'].includes(key))
    .map(([key]) => translateFeatureLabel(key))
})

const monthlyPrice = computed(() => Number(plan.value.price || 0))
const yearlySaving = computed(() => monthlyPrice.value * 2)
const total = computed(() => billing.value === 'yearly' ? monthlyPrice.value * 10 : monthlyPrice.value)
const yearlyMonthlyEquivalent = computed(() => total.value / 12)
const cardDigits = computed(() => form.cardNumber.replace(/\D/g, ''))
const cardLastFour = computed(() => cardDigits.value.slice(-4))
const cardBrand = computed(() => {
  if (/^4/.test(cardDigits.value)) return 'Visa'
  if (/^(5[1-5]|2[2-7])/.test(cardDigits.value)) return 'Mastercard'
  if (/^3[47]/.test(cardDigits.value)) return 'American Express'
  return 'Cartão de teste'
})

const formatCurrency = (amount: number) => new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'ZAR',
  maximumFractionDigits: 0,
}).format(amount)

const renewalDate = computed(() => {
  const date = new Date()
  if (billing.value === 'yearly') date.setFullYear(date.getFullYear() + 1)
  else date.setMonth(date.getMonth() + 1)
  return new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
})

const clearError = (field: CardField) => {
  errors[field] = undefined
  errorMessage.value = ''
}

const formatCardNumber = () => {
  const digits = form.cardNumber.replace(/\D/g, '').slice(0, 19)
  form.cardNumber = digits.replace(/(\d{4})(?=\d)/g, '$1 ')
  clearError('cardNumber')
}

const formatExpiry = () => {
  const digits = form.expiry.replace(/\D/g, '').slice(0, 4)
  form.expiry = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
  clearError('expiry')
}

const formatCvv = () => {
  form.cvv = form.cvv.replace(/\D/g, '').slice(0, 4)
  clearError('cvv')
}

const isExpiryValid = () => {
  const match = /^(\d{2})\/(\d{2})$/.exec(form.expiry)
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  const now = new Date()
  return month >= 1
    && month <= 12
    && (year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1))
}

const validatePayment = () => {
  errors.cardName = form.cardName.trim().length >= 2 ? undefined : 'Introduza o nome apresentado no cartão.'
  errors.cardNumber = /^\d{13,19}$/.test(cardDigits.value) ? undefined : 'Introduza um número de cartão com 13 a 19 dígitos.'
  errors.expiry = isExpiryValid() ? undefined : 'Introduza uma data de validade futura.'
  errors.cvv = /^\d{3,4}$/.test(form.cvv) ? undefined : 'Introduza o código de segurança de 3 ou 4 dígitos.'
  return !errors.cardName && !errors.cardNumber && !errors.expiry && !errors.cvv
}

const focusFirstError = async () => {
  await nextTick()
  checkoutTop.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
}

const scrollToCheckoutTop = async () => {
  await nextTick()
  if (!import.meta.client) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  checkoutTop.value?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}

const goToReview = async () => {
  errorMessage.value = ''
  if (paymentMethod.value !== 'card') {
    errorMessage.value = 'Escolha o pagamento por cartão para continuar no modo de teste local.'
    return
  }
  if (!validatePayment()) {
    errorMessage.value = 'Verifique os dados de pagamento assinalados.'
    await focusFirstError()
    return
  }
  currentStep.value = 'review'
  confirmed.value = false
  await scrollToCheckoutTop()
}

const editPayment = async () => {
  currentStep.value = 'payment'
  errors.confirmation = undefined
  errorMessage.value = ''
  await scrollToCheckoutTop()
}

const completeCheckout = async () => {
  errorMessage.value = ''
  if (!confirmed.value) {
    errors.confirmation = 'Confirme que pretende concluir esta compra de teste local.'
    return
  }

  errors.confirmation = undefined
  submitting.value = true
  await new Promise(resolve => setTimeout(resolve, 900))

  if (import.meta.client) {
    localStorage.setItem('school-test-subscription', JSON.stringify({
      plan: plan.value.name,
      billingCycle: billing.value,
      amount: total.value,
      currency: 'ZAR',
      paymentMethod: paymentMethod.value,
      cardBrand: cardBrand.value,
      cardLastFour: cardLastFour.value,
      autoRenew: autoRenew.value,
      nextBillingDate: autoRenew.value ? renewalDate.value : null,
      status: 'paid',
      testMode: true,
      completedAt: new Date().toISOString(),
    }))
    clearCart()
    sessionStorage.removeItem('registration-plan')
  }

  await navigateTo('/dashboard?subscription=test-complete')
}

onMounted(async () => {
  initialiseCart()
  if (!cartItem.value) {
    await navigateTo('/#plans')
    return
  }

  await initialiseAuth()
  if (!isAuthenticated.value) {
    await login('/subscribe')
    return
  }

  try {
    plan.value = cartItem.value
    registration.value = {
      firstName: user.value?.firstName,
      lastName: user.value?.lastName,
      email: user.value?.email,
    }
    form.cardName = `${registration.value.firstName || ''} ${registration.value.lastName || ''}`.trim()
  } catch {
    clearCart()
    sessionStorage.removeItem('registration-plan')
    await navigateTo('/#plans')
  }
})

useSeoMeta({ title: 'Finalizar compra', robots: 'noindex' })
</script>

<template>
  <section ref="checkoutTop" class="container subscription-shell checkout-shell">
    <header class="checkout-header">
      <div>
        <span class="eyebrow">Compra segura</span>
        <h1>Conclua a sua subscrição</h1>
        <p>Reveja o plano, adicione um método de pagamento de teste e confirme o espaço da sua escola.</p>
      </div>
      <span class="checkout-test-badge">
        <Icon name="ph:flask" size="18" aria-hidden="true" />
        Modo de teste local
      </span>
    </header>

    <ol class="checkout-progress" aria-label="Progresso da compra">
      <li class="is-complete">
        <span><Icon name="ph:check-bold" size="15" aria-hidden="true" /></span>
        <div><small>Conta</small><strong>Criada</strong></div>
      </li>
      <li :class="{ 'is-active': currentStep === 'payment', 'is-complete': currentStep === 'review' }" :aria-current="currentStep === 'payment' ? 'step' : undefined">
        <span><Icon v-if="currentStep === 'review'" name="ph:check-bold" size="15" aria-hidden="true" /><template v-else>2</template></span>
        <div><small>Pagamento</small><strong>{{ currentStep === 'review' ? 'Adicionado' : 'Etapa atual' }}</strong></div>
      </li>
      <li :class="{ 'is-active': currentStep === 'review' }" :aria-current="currentStep === 'review' ? 'step' : undefined">
        <span>3</span>
        <div><small>Revisão</small><strong>Confirmar pedido</strong></div>
      </li>
    </ol>

    <aside class="panel subscription-summary checkout-summary">
      <div class="checkout-summary__heading">
        <span>Resumo do pedido</span>
        <NuxtLink class="text-link" to="/#plans">Alterar plano</NuxtLink>
      </div>
      <h2>{{ plan.name }}</h2>
      <p>{{ plan.description || 'O espaço da sua escola com as ferramentas incluídas neste plano.' }}</p>

      <ul class="feature-list checkout-feature-list">
        <li v-for="feature in planFeatures" :key="feature">
          <Icon name="ph:check-circle-fill" size="19" aria-hidden="true" />
          <span>{{ feature }}</span>
        </li>
      </ul>

      <dl class="checkout-totals">
        <div>
          <dt>Plano {{ plan.name }}</dt>
          <dd>{{ formatCurrency(monthlyPrice) }} / mês</dd>
        </div>
        <div v-if="billing === 'yearly'" class="checkout-saving">
          <dt>Poupança anual</dt>
          <dd>-{{ formatCurrency(yearlySaving) }}</dd>
        </div>
        <div class="checkout-total-row">
          <dt>Total de hoje</dt>
          <dd>{{ formatCurrency(total) }}</dd>
        </div>
      </dl>

      <p class="checkout-summary__note">
        <Icon name="ph:shield-check" size="19" aria-hidden="true" />
        Os dados do cartão de teste permanecem no seu navegador e nunca são guardados.
      </p>
    </aside>

    <main class="panel subscription-form checkout-card">
      <form v-if="currentStep === 'payment'" class="form-stack checkout-form" novalidate @submit.prevent="goToReview">
        <div class="checkout-section-heading">
          <div>
            <span>Etapa 2 de 3</span>
            <h2>Faturação e pagamento</h2>
          </div>
          <div v-if="registration.email" class="checkout-account">
            <Icon name="ph:user-circle" size="22" aria-hidden="true" />
            <span><small>Conta</small><strong>{{ registration.email }}</strong></span>
          </div>
        </div>

        <AppAlert v-if="errorMessage" type="error" :message="errorMessage" />

        <fieldset class="checkout-fieldset">
          <legend>Escolha a frequência de faturação</legend>
          <div class="checkout-billing-options">
            <label :class="{ 'is-selected': billing === 'monthly' }">
              <input v-model="billing" type="radio" value="monthly">
              <span>
                <strong>Mensal</strong>
                <small>Faturação mensal flexível</small>
              </span>
              <b>{{ formatCurrency(monthlyPrice) }}<small>/mês</small></b>
            </label>
            <label :class="{ 'is-selected': billing === 'yearly' }">
              <input v-model="billing" type="radio" value="yearly">
              <span>
                <strong>Anual</strong>
                <small>Dois meses incluídos sem custos</small>
              </span>
              <b>{{ formatCurrency(yearlyMonthlyEquivalent) }}<small>/mês</small></b>
              <em>Poupe {{ formatCurrency(yearlySaving) }}</em>
            </label>
          </div>
        </fieldset>

        <fieldset class="checkout-fieldset">
          <legend>Método de pagamento</legend>
          <div class="payment-methods checkout-payment-methods">
            <button type="button" class="is-active" aria-pressed="true" @click="paymentMethod = 'card'">
              <Icon name="ph:credit-card" size="21" aria-hidden="true" />
              <span>Cartão</span>
            </button>
            <button type="button" disabled title="Disponível depois de ligar o gateway PayPal">
              <Icon name="ph:paypal-logo" size="21" aria-hidden="true" />
              <span>PayPal <small>Brevemente</small></span>
            </button>
            <button type="button" disabled title="Disponível depois de ligar o gateway PayU">
              <Icon name="ph:bank" size="21" aria-hidden="true" />
              <span>PayU <small>Brevemente</small></span>
            </button>
          </div>
        </fieldset>

        <div class="checkout-card-fields">
          <div class="checkout-card-fields__heading">
            <div>
              <h3>Dados do cartão</h3>
              <p>Para o teste local, utilize qualquer número com 13 a 19 dígitos e uma validade futura.</p>
            </div>
            <Icon name="ph:lock-key" size="22" aria-hidden="true" />
          </div>

          <div class="field">
            <label for="card-name">Nome no cartão</label>
            <input id="card-name" v-model="form.cardName" type="text" autocomplete="cc-name" placeholder="Nome do titular" :aria-invalid="Boolean(errors.cardName)" @input="clearError('cardName')">
            <p v-if="errors.cardName" class="field__error">{{ errors.cardName }}</p>
          </div>

          <div class="field">
            <label for="card-number">Número do cartão</label>
            <div class="checkout-input-wrap">
              <input id="card-number" v-model="form.cardNumber" type="text" inputmode="numeric" autocomplete="cc-number" placeholder="0000 0000 0000 0000" maxlength="23" :aria-invalid="Boolean(errors.cardNumber)" @input="formatCardNumber">
              <span v-if="cardDigits.length >= 4">{{ cardBrand }}</span>
            </div>
            <p v-if="errors.cardNumber" class="field__error">{{ errors.cardNumber }}</p>
          </div>

          <div class="form-grid">
            <div class="field">
              <label for="card-expiry">Data de validade</label>
              <input id="card-expiry" v-model="form.expiry" type="text" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/YY" maxlength="5" :aria-invalid="Boolean(errors.expiry)" @input="formatExpiry">
              <p v-if="errors.expiry" class="field__error">{{ errors.expiry }}</p>
            </div>
            <div class="field">
              <label for="card-cvv">Código de segurança</label>
              <input id="card-cvv" v-model="form.cvv" type="password" inputmode="numeric" autocomplete="cc-csc" placeholder="3 ou 4 dígitos" maxlength="4" :aria-invalid="Boolean(errors.cvv)" @input="formatCvv">
              <p v-if="errors.cvv" class="field__error">{{ errors.cvv }}</p>
            </div>
          </div>
        </div>

        <label class="checkout-renewal">
          <input v-model="autoRenew" type="checkbox">
          <span>
            <strong>Renovar automaticamente esta subscrição</strong>
            <small v-if="autoRenew">A próxima data de faturação de teste será {{ renewalDate }}.</small>
            <small v-else>A subscrição terminará no final deste período de faturação.</small>
          </span>
        </label>

        <button class="button button--primary checkout-primary-action" type="submit">
          Rever pedido
          <Icon name="ph:arrow-right" size="20" aria-hidden="true" />
        </button>
        <p class="checkout-action-note">
          <Icon name="ph:lock-simple" size="16" aria-hidden="true" />
          Nenhum pagamento será efetuado na etapa seguinte.
        </p>
      </form>

      <form v-else class="form-stack checkout-form" @submit.prevent="completeCheckout">
        <div class="checkout-section-heading">
          <div>
            <span>Etapa 3 de 3</span>
            <h2>Reveja o seu pedido</h2>
          </div>
          <button class="button button--ghost checkout-edit-button" type="button" @click="editPayment">
            <Icon name="ph:pencil-simple" size="18" aria-hidden="true" />
            Editar pagamento
          </button>
        </div>

        <AppAlert v-if="errorMessage" type="error" :message="errorMessage" />

        <dl class="checkout-review-list">
          <div>
            <dt>Conta</dt>
            <dd>{{ registration.email || 'A sua conta Lusivo registada' }}</dd>
          </div>
          <div>
            <dt>Plano</dt>
            <dd>{{ plan.name }}</dd>
          </div>
          <div>
            <dt>Faturação</dt>
            <dd>{{ billing === 'yearly' ? 'Anual' : 'Mensal' }}</dd>
          </div>
          <div>
            <dt>Pagamento</dt>
            <dd>{{ cardBrand }} terminado em {{ cardLastFour }}</dd>
          </div>
          <div>
            <dt>Renovação</dt>
            <dd>{{ autoRenew ? `Renova em ${renewalDate}` : 'A renovação automática está desativada' }}</dd>
          </div>
        </dl>

        <div class="checkout-review-total">
          <span><small>Total a pagar hoje</small><strong>{{ billing === 'yearly' ? 'Subscrição anual' : 'Subscrição mensal' }}</strong></span>
          <b>{{ formatCurrency(total) }}</b>
        </div>

        <label class="checkout-confirmation" :class="{ 'has-error': errors.confirmation }">
          <input v-model="confirmed" type="checkbox" @change="errors.confirmation = undefined">
          <span>Confirmo esta subscrição de teste local e compreendo que nenhum pagamento real será processado.</span>
        </label>
        <p v-if="errors.confirmation" class="field__error">{{ errors.confirmation }}</p>

        <button class="button button--primary checkout-primary-action" type="submit" :disabled="submitting">
          <Icon v-if="submitting" name="ph:circle-notch" size="19" aria-hidden="true" />
          <Icon v-else name="ph:check-circle" size="20" aria-hidden="true" />
          {{ submitting ? 'A concluir a compra...' : `Concluir compra de teste por ${formatCurrency(total)}` }}
        </button>
        <button class="button button--ghost checkout-back-action" type="button" :disabled="submitting" @click="editPayment">
          Voltar aos dados de pagamento
        </button>
      </form>
    </main>
  </section>
</template>
