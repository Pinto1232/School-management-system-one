<script setup lang="ts">
import { fallbackPlans } from '~/data/school'
import type { PackagePlan } from '~/types'

const plan = ref<PackagePlan>(fallbackPlans[1]!)
const billing = ref<'monthly' | 'yearly'>('monthly')
const paymentMethod = ref<'card' | 'paypal' | 'payu'>('card')
const registration = ref<{ firstName?: string; lastName?: string; email?: string }>({})
const form = reactive({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
const submitting = ref(false)
const errorMessage = ref('')

const planFeatures = computed(() => {
  if (Array.isArray(plan.value.features)) return plan.value.features
  const source = plan.value.features && typeof plan.value.features === 'object'
    ? plan.value.features
    : plan.value
  return Object.entries(source)
    .filter(([key, value]) => value === true && !['_id', 'id', 'name', 'price', '__v'].includes(key))
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, value => value.toUpperCase()))
})

const total = computed(() => {
  const monthly = Number(plan.value.price || 0)
  return billing.value === 'yearly' ? monthly * 10 : monthly
})

const submit = async () => {
  errorMessage.value = ''

  if (paymentMethod.value === 'card') {
    const cardDigits = form.cardNumber.replace(/\s/g, '')
    if (!form.cardName || !/^\d{13,19}$/.test(cardDigits) || !/^\d{2}\/\d{2}$/.test(form.expiry) || !/^\d{3,4}$/.test(form.cvv)) {
      errorMessage.value = 'Complete the card details before continuing.'
      return
    }
  }

  submitting.value = true
  await new Promise(resolve => setTimeout(resolve, 900))

  if (import.meta.client) {
    localStorage.setItem('school-test-subscription', JSON.stringify({
      plan: plan.value.name,
      billingCycle: billing.value,
      amount: total.value,
      currency: 'ZAR',
      paymentMethod: paymentMethod.value,
      status: 'paid',
      testMode: true,
      completedAt: new Date().toISOString(),
    }))
    localStorage.removeItem('selectedPackage')
    sessionStorage.removeItem('registration')
  }

  await navigateTo('/login?subscription=test-complete')
}

onMounted(() => {
  try {
    const savedPlan = localStorage.getItem('selectedPackage')
    const savedRegistration = sessionStorage.getItem('registration')
    if (savedPlan) plan.value = JSON.parse(savedPlan) as PackagePlan
    if (savedRegistration) registration.value = JSON.parse(savedRegistration)
    form.cardName = `${registration.value.firstName || ''} ${registration.value.lastName || ''}`.trim()
  } catch {
    localStorage.removeItem('selectedPackage')
    sessionStorage.removeItem('registration')
  }
})

useSeoMeta({ title: 'Subscription', robots: 'noindex' })
</script>

<template>
  <section class="container subscription-shell">
    <aside class="panel subscription-summary">
      <span class="eyebrow" style="color: #8ae0d1">Selected plan</span>
      <h1>{{ plan.name }}</h1>
      <p>{{ plan.description || 'Your school workspace with the tools included in this plan.' }}</p>
      <div class="plan-card__price" style="color: #effffb">
        R{{ total.toLocaleString('en-ZA') }}
        <span style="color: #cce9e3">/ {{ billing === 'yearly' ? 'year' : 'month' }}</span>
      </div>
      <ul class="feature-list">
        <li v-for="feature in planFeatures" :key="feature">
          <Icon name="ph:check-circle-fill" size="19" aria-hidden="true" />
          <span>{{ feature }}</span>
        </li>
      </ul>
      <NuxtLink class="text-link" to="/">Change plan</NuxtLink>
    </aside>

    <div class="panel subscription-form">
      <div class="auth-card__header">
        <h2>Set up billing</h2>
        <p v-if="registration.email">Account: {{ registration.email }}</p>
        <p v-else>Choose billing frequency and a payment method.</p>
      </div>

      <form class="form-stack" novalidate @submit.prevent="submit">
        <AppAlert v-if="errorMessage" type="error" :message="errorMessage" />

        <div class="field">
          <span class="field__label">Billing frequency</span>
          <div class="billing-toggle" aria-label="Billing frequency">
            <button type="button" :class="{ 'is-active': billing === 'monthly' }" @click="billing = 'monthly'">Monthly</button>
            <button type="button" :class="{ 'is-active': billing === 'yearly' }" @click="billing = 'yearly'">Yearly</button>
          </div>
          <p class="field__helper">Yearly billing includes two months at no charge.</p>
        </div>

        <div class="field">
          <span class="field__label">Payment method</span>
          <div class="payment-methods">
            <button type="button" :class="{ 'is-active': paymentMethod === 'card' }" @click="paymentMethod = 'card'">
              <Icon name="ph:credit-card" size="21" aria-hidden="true" /> Card
            </button>
            <button type="button" :class="{ 'is-active': paymentMethod === 'paypal' }" @click="paymentMethod = 'paypal'">PayPal</button>
            <button type="button" :class="{ 'is-active': paymentMethod === 'payu' }" @click="paymentMethod = 'payu'">PayU</button>
          </div>
        </div>

        <template v-if="paymentMethod === 'card'">
          <div class="field">
            <label for="card-name">Name on card</label>
            <input id="card-name" v-model="form.cardName" type="text" autocomplete="cc-name" placeholder="Cardholder name">
          </div>
          <div class="field">
            <label for="card-number">Card number</label>
            <input id="card-number" v-model="form.cardNumber" type="text" inputmode="numeric" autocomplete="cc-number" placeholder="0000 0000 0000 0000" maxlength="23">
          </div>
          <div class="form-grid">
            <div class="field">
              <label for="card-expiry">Expiry</label>
              <input id="card-expiry" v-model="form.expiry" type="text" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/YY" maxlength="5">
            </div>
            <div class="field">
              <label for="card-cvv">Security code</label>
              <input id="card-cvv" v-model="form.cvv" type="password" inputmode="numeric" autocomplete="cc-csc" placeholder="CVV" maxlength="4">
            </div>
          </div>
        </template>

        <AppAlert v-else type="info" message="The selected provider will open after a live payment gateway is connected." />

        <button class="button button--primary" type="submit" :disabled="submitting">
          {{ submitting ? 'Preparing subscription...' : `Continue with R${total.toLocaleString('en-ZA')}` }}
        </button>
        <p class="field__helper">No live payment is submitted by this development build.</p>
      </form>
    </div>
  </section>
</template>
