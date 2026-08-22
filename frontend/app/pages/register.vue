<script setup lang="ts">
import type { PackagePlan, User } from '~/types'

const { request } = useApi()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  packageName: '',
  profileImage: null as File | null,
})
const errors = reactive<Record<string, string | undefined>>({})
const submitting = ref(false)
const message = ref('')
const selectedPlan = ref<PackagePlan | null>(null)

const validate = () => {
  errors.firstName = /^[A-Za-zÀ-ž' -]+$/.test(form.firstName.trim()) ? undefined : 'Enter a valid first name.'
  errors.lastName = /^[A-Za-zÀ-ž' -]+$/.test(form.lastName.trim()) ? undefined : 'Enter a valid last name.'
  errors.email = /^\S+@\S+\.\S+$/.test(form.email) ? undefined : 'Enter a valid email address.'
  errors.password = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(form.password)
    ? undefined
    : 'Use at least 6 characters with one letter and one number.'
  errors.profileImage = form.profileImage ? undefined : 'Choose a profile image.'
  errors.packageName = form.packageName.trim() ? undefined : 'Choose or enter a package name.'
  return !Object.values(errors).some(Boolean)
}

const handleFile = (event: Event) => {
  const input = event.target as HTMLInputElement
  form.profileImage = input.files?.[0] || null
  errors.profileImage = form.profileImage ? undefined : 'Choose a profile image.'
}

const submit = async () => {
  message.value = ''
  if (!validate()) return
  submitting.value = true

  const body = new FormData()
  body.append('firstName', form.firstName.trim())
  body.append('lastName', form.lastName.trim())
  body.append('email', form.email.trim())
  body.append('password', form.password)
  body.append('packageName', form.packageName.trim())
  if (form.profileImage) body.append('profileImage', form.profileImage)

  try {
    const response = await request<{ message: string; user: User }>('/users/register', {
      method: 'POST',
      body,
    })
    if (import.meta.client) {
      sessionStorage.setItem('registration', JSON.stringify({
        user: response.user,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      }))
    }
    await navigateTo('/subscribe')
  } catch (error) {
    message.value = getApiErrorMessage(error, 'Registration failed. Review your details and try again.')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('selectedPackage')
    if (saved) {
      selectedPlan.value = JSON.parse(saved) as PackagePlan
      form.packageName = selectedPlan.value?.name || ''
    }
  } catch {
    localStorage.removeItem('selectedPackage')
  }
})

useSeoMeta({ title: 'Create account', robots: 'noindex' })
</script>

<template>
  <section class="auth-shell">
    <div class="auth-shell__visual">
      <img src="/images/background-01.webp" alt="A teacher supporting learners with digital coursework" width="1200" height="900">
      <div class="auth-shell__visual-copy">
        <h1>Bring your school into one workspace.</h1>
        <p>Create an account, confirm your plan, and connect the people and records that shape each school day.</p>
      </div>
    </div>
    <div class="auth-shell__form">
      <div class="auth-card">
        <div class="auth-card__header">
          <h2>Create account</h2>
          <p v-if="selectedPlan">Continue with the {{ selectedPlan.name }} plan.</p>
          <p v-else>Enter your details to get started.</p>
        </div>

        <form class="form-stack" novalidate @submit.prevent="submit">
          <AppAlert v-if="message" type="error" :message="message" />

          <div class="form-grid">
            <div class="field">
              <label for="first-name">First name</label>
              <input id="first-name" v-model="form.firstName" type="text" autocomplete="given-name" placeholder="Your first name" :aria-invalid="Boolean(errors.firstName)">
              <p v-if="errors.firstName" class="field__error">{{ errors.firstName }}</p>
            </div>
            <div class="field">
              <label for="last-name">Last name</label>
              <input id="last-name" v-model="form.lastName" type="text" autocomplete="family-name" placeholder="Your last name" :aria-invalid="Boolean(errors.lastName)">
              <p v-if="errors.lastName" class="field__error">{{ errors.lastName }}</p>
            </div>
          </div>

          <div class="field">
            <label for="register-email">Email address</label>
            <input id="register-email" v-model.trim="form.email" type="email" autocomplete="email" placeholder="name@school.co.za" :aria-invalid="Boolean(errors.email)">
            <p v-if="errors.email" class="field__error">{{ errors.email }}</p>
          </div>

          <div class="field">
            <label for="register-password">Password</label>
            <input id="register-password" v-model="form.password" type="password" autocomplete="new-password" placeholder="Create a password" :aria-invalid="Boolean(errors.password)">
            <p v-if="errors.password" class="field__error">{{ errors.password }}</p>
            <p v-else class="field__helper">At least 6 characters, including one number.</p>
          </div>

          <div class="field">
            <label for="package-name">Package name</label>
            <input id="package-name" v-model="form.packageName" type="text" placeholder="Essential or Complete" :aria-invalid="Boolean(errors.packageName)">
            <p v-if="errors.packageName" class="field__error">{{ errors.packageName }}</p>
          </div>

          <div class="field">
            <label for="profile-image">Profile image</label>
            <input id="profile-image" type="file" accept="image/png,image/jpeg,image/webp" :aria-invalid="Boolean(errors.profileImage)" @change="handleFile">
            <p v-if="errors.profileImage" class="field__error">{{ errors.profileImage }}</p>
            <p v-else class="field__helper">PNG, JPG, or WebP.</p>
          </div>

          <button class="button button--primary" type="submit" :disabled="submitting" style="width: 100%">
            <Icon v-if="submitting" name="ph:circle-notch" size="19" aria-hidden="true" />
            {{ submitting ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <p class="auth-card__footer">Already registered? <NuxtLink class="text-link" to="/login">Log in</NuxtLink></p>
      </div>
    </div>
  </section>
</template>
