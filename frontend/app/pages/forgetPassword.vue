<script setup lang="ts">
const { request } = useApi()
const email = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const submitting = ref(false)

const submit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errorMessage.value = 'Enter a valid email address.'
    return
  }

  submitting.value = true
  try {
    const response = await request<{ message?: string }>('/request-password-reset', {
      method: 'POST',
      body: { email: email.value.trim() },
    })
    successMessage.value = response.message || 'A reset link has been sent to your email address.'
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error, 'We could not send the reset link. Please try again.')
  } finally {
    submitting.value = false
  }
}

useSeoMeta({ title: 'Reset password', robots: 'noindex' })
</script>

<template>
  <section class="section">
    <div class="container--narrow" style="max-width: 480px">
      <div class="panel auth-card" style="padding: clamp(1.5rem, 5vw, 2.5rem)">
        <div class="auth-card__header">
          <h1>Reset your password</h1>
          <p>Enter your account email and we will send you a reset link.</p>
        </div>
        <form class="form-stack" novalidate @submit.prevent="submit">
          <AppAlert v-if="errorMessage" type="error" :message="errorMessage" />
          <AppAlert v-if="successMessage" type="success" :message="successMessage" />
          <div class="field">
            <label for="reset-email">Email address</label>
            <input id="reset-email" v-model.trim="email" type="email" autocomplete="email" placeholder="name@school.co.za" :aria-invalid="Boolean(errorMessage && !successMessage)">
          </div>
          <button class="button button--primary" type="submit" :disabled="submitting">
            {{ submitting ? 'Sending link...' : 'Send reset link' }}
          </button>
        </form>
        <p class="auth-card__footer"><NuxtLink class="text-link" to="/login">Return to login</NuxtLink></p>
      </div>
    </div>
  </section>
</template>
