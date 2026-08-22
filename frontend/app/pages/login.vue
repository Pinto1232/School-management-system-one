<script setup lang="ts">
import type { AuthResponse } from '~/types'

const { request } = useApi()
const { login, isAuthenticated } = useAuth()

const form = reactive({ email: '', password: '', remember: false })
const errors = reactive<{ email?: string; password?: string }>({})
const showPassword = ref(false)
const submitting = ref(false)
const message = ref('')

const validate = () => {
  errors.email = !form.email
    ? 'Email is required.'
    : !/^\S+@\S+\.\S+$/.test(form.email)
      ? 'Enter a valid email address.'
      : undefined
  errors.password = !form.password ? 'Password is required.' : undefined
  return !errors.email && !errors.password
}

const submit = async () => {
  message.value = ''
  if (!validate()) return
  submitting.value = true

  try {
    const response = await request<AuthResponse>('/users/login', {
      method: 'POST',
      body: {
        email: form.email.trim(),
        password: form.password,
      },
    })
    login(response.user, response.token, form.remember)
    await navigateTo('/dashboard')
  } catch (error) {
    message.value = getApiErrorMessage(error, 'Login failed. Check your details and try again.')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  if (isAuthenticated.value) navigateTo('/dashboard')
})

useSeoMeta({ title: 'Log in', robots: 'noindex' })
</script>

<template>
  <section class="auth-shell">
    <div class="auth-shell__visual">
      <img src="/images/school.webp" alt="A large school lecture room" width="1200" height="900">
      <div class="auth-shell__visual-copy">
        <h1>Welcome back.</h1>
        <p>Open your school dashboard and continue with the people, classes, and tasks that need attention.</p>
      </div>
    </div>
    <div class="auth-shell__form">
      <div class="auth-card">
        <div class="auth-card__header">
          <h2>Log in</h2>
          <p>Use your school account details.</p>
        </div>

        <form class="form-stack" novalidate @submit.prevent="submit">
          <AppAlert v-if="message" type="error" :message="message" />

          <div class="field">
            <label for="login-email">Email address</label>
            <input
              id="login-email"
              v-model.trim="form.email"
              type="email"
              autocomplete="email"
              placeholder="name@school.co.za"
              :aria-invalid="Boolean(errors.email)"
              :aria-describedby="errors.email ? 'login-email-error' : undefined"
              @blur="validate"
            >
            <p v-if="errors.email" id="login-email-error" class="field__error">{{ errors.email }}</p>
          </div>

          <div class="field">
            <label for="login-password">Password</label>
            <div style="position: relative">
              <input
                id="login-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Enter your password"
                style="padding-right: 3rem"
                :aria-invalid="Boolean(errors.password)"
                :aria-describedby="errors.password ? 'login-password-error' : undefined"
                @blur="validate"
              >
              <button
                class="icon-button"
                type="button"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                style="position: absolute; top: 1px; right: 1px; width: 44px; height: 44px; border: 0; background: transparent"
                @click="showPassword = !showPassword"
              >
                <Icon :name="showPassword ? 'ph:eye-slash' : 'ph:eye'" size="20" aria-hidden="true" />
              </button>
            </div>
            <p v-if="errors.password" id="login-password-error" class="field__error">{{ errors.password }}</p>
          </div>

          <div class="check-row">
            <label><input v-model="form.remember" type="checkbox"> Keep me logged in</label>
            <NuxtLink class="text-link" to="/forgetPassword">Forgot password?</NuxtLink>
          </div>

          <button class="button button--primary" type="submit" :disabled="submitting" style="width: 100%">
            <Icon v-if="submitting" name="ph:circle-notch" size="19" aria-hidden="true" />
            {{ submitting ? 'Logging in...' : 'Log in' }}
          </button>
        </form>

        <p class="auth-card__footer">New to School System? <NuxtLink class="text-link" to="/register">Create an account</NuxtLink></p>
      </div>
    </div>
  </section>
</template>
