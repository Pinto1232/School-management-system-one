<script setup lang="ts">
const route = useRoute()
const { request } = useApi()
const token = computed(() => String(route.params.token || ''))
const validating = ref(true)
const valid = ref(false)
const userEmail = ref('')
const password = ref('')
const confirmPassword = ref('')
const message = ref('')
const success = ref(false)
const submitting = ref(false)

const validateToken = async () => {
  validating.value = true
  message.value = ''
  try {
    const response = await request<{ userEmail: string }>(`/reset-password/validate-reset-token/${encodeURIComponent(token.value)}`)
    userEmail.value = response.userEmail
    valid.value = true
  } catch (error) {
    valid.value = false
    message.value = getApiErrorMessage(error, 'This reset link is invalid or has expired.')
  } finally {
    validating.value = false
  }
}

const submit = async () => {
  message.value = ''
  if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password.value)) {
    message.value = 'Use at least 6 characters with one letter and one number.'
    return
  }
  if (password.value !== confirmPassword.value) {
    message.value = 'The passwords do not match.'
    return
  }

  submitting.value = true
  try {
    const response = await request<{ message?: string }>('/reset-password/update-password', {
      method: 'POST',
      body: { userEmail: userEmail.value, password: password.value },
    })
    success.value = true
    message.value = response.message || 'Your password has been updated.'
  } catch (error) {
    message.value = getApiErrorMessage(error, 'Your password could not be updated.')
  } finally {
    submitting.value = false
  }
}

onMounted(validateToken)
useSeoMeta({ title: 'Choose a new password', robots: 'noindex' })
</script>

<template>
  <section class="section">
    <div class="container--narrow" style="max-width: 480px">
      <div class="panel auth-card" style="padding: clamp(1.5rem, 5vw, 2.5rem)">
        <div class="auth-card__header">
          <h1>Choose a new password</h1>
          <p v-if="validating">Checking your reset link.</p>
          <p v-else-if="valid">Resetting the password for {{ userEmail }}.</p>
          <p v-else>The reset link cannot be used.</p>
        </div>

        <div v-if="validating" class="form-stack" aria-label="Validating reset link">
          <AppSkeleton height="46px" />
          <AppSkeleton height="46px" />
          <AppSkeleton height="46px" />
        </div>

        <AppAlert v-else-if="!valid" type="error" :message="message" />

        <div v-else-if="success" class="form-stack">
          <AppAlert type="success" :message="message" />
          <NuxtLink class="button button--primary" to="/login">Log in</NuxtLink>
        </div>

        <form v-else class="form-stack" novalidate @submit.prevent="submit">
          <AppAlert v-if="message" type="error" :message="message" />
          <div class="field">
            <label for="new-password">New password</label>
            <input id="new-password" v-model="password" type="password" autocomplete="new-password" placeholder="Enter a new password">
            <p class="field__helper">At least 6 characters, including one number.</p>
          </div>
          <div class="field">
            <label for="confirm-password">Confirm password</label>
            <input id="confirm-password" v-model="confirmPassword" type="password" autocomplete="new-password" placeholder="Repeat your new password">
          </div>
          <button class="button button--primary" type="submit" :disabled="submitting">
            {{ submitting ? 'Updating password...' : 'Update password' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
