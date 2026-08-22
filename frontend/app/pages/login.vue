<script setup lang="ts">
import type { AuthResponse } from '~/types'

const { request } = useApi()
const { login, isAuthenticated } = useAuth()
const route = useRoute()

const form = reactive({ email: '', password: '', remember: false })
const errors = reactive<{ email?: string; password?: string }>({})
const showPassword = ref(false)
const submitting = ref(false)
const message = ref('')
const notice = computed(() => route.query.subscription === 'test-complete'
  ? 'O pagamento de teste local foi concluído. Inicie sessão para continuar para o painel.'
  : '')

const validate = () => {
  errors.email = !form.email
    ? 'O e-mail é obrigatório.'
    : !/^\S+@\S+\.\S+$/.test(form.email)
      ? 'Introduza um endereço de e-mail válido.'
      : undefined
  errors.password = !form.password ? 'A palavra-passe é obrigatória.' : undefined
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
    message.value = getApiErrorMessage(error, 'Não foi possível iniciar sessão. Verifique os dados e tente novamente.')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  if (isAuthenticated.value) navigateTo('/dashboard')
})

useSeoMeta({ title: 'Iniciar sessão', robots: 'noindex' })
</script>

<template>
  <section class="auth-shell">
    <div class="auth-shell__visual">
      <img src="/images/school.webp" alt="Uma grande sala de aulas" width="1200" height="900">
      <div class="auth-shell__visual-copy">
        <h1>Bem-vindo de volta.</h1>
        <p>Abra o painel da sua escola e continue a acompanhar as pessoas, turmas e tarefas que precisam de atenção.</p>
      </div>
    </div>
    <div class="auth-shell__form">
      <div class="auth-card">
        <div class="auth-card__header">
          <h2>Iniciar sessão</h2>
          <p>Utilize os dados da sua conta escolar.</p>
        </div>

        <form class="form-stack" novalidate @submit.prevent="submit">
          <AppAlert v-if="notice" type="success" :message="notice" />
          <AppAlert v-if="message" type="error" :message="message" />

          <div class="field">
            <label for="login-email">Endereço de e-mail</label>
            <input
              id="login-email"
              v-model.trim="form.email"
              type="email"
              autocomplete="email"
              placeholder="nome@escola.co.za"
              :aria-invalid="Boolean(errors.email)"
              :aria-describedby="errors.email ? 'login-email-error' : undefined"
              @blur="validate"
            >
            <p v-if="errors.email" id="login-email-error" class="field__error">{{ errors.email }}</p>
          </div>

          <div class="field">
            <label for="login-password">Palavra-passe</label>
            <div style="position: relative">
              <input
                id="login-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Introduza a sua palavra-passe"
                style="padding-right: 3rem"
                :aria-invalid="Boolean(errors.password)"
                :aria-describedby="errors.password ? 'login-password-error' : undefined"
                @blur="validate"
              >
              <button
                class="icon-button"
                type="button"
                :aria-label="showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'"
                style="position: absolute; top: 1px; right: 1px; width: 44px; height: 44px; border: 0; background: transparent"
                @click="showPassword = !showPassword"
              >
                <Icon :name="showPassword ? 'ph:eye-slash' : 'ph:eye'" size="20" aria-hidden="true" />
              </button>
            </div>
            <p v-if="errors.password" id="login-password-error" class="field__error">{{ errors.password }}</p>
          </div>

          <div class="check-row">
            <label><input v-model="form.remember" type="checkbox"> Manter sessão iniciada</label>
            <NuxtLink class="text-link" to="/forgetPassword">Esqueceu a palavra-passe?</NuxtLink>
          </div>

          <button class="button button--primary" type="submit" :disabled="submitting" style="width: 100%">
            <Icon v-if="submitting" name="ph:circle-notch" size="19" aria-hidden="true" />
            {{ submitting ? 'A iniciar sessão...' : 'Iniciar sessão' }}
          </button>
        </form>

        <p class="auth-card__footer">Ainda não utiliza a Lusivo? <NuxtLink class="text-link" to="/#plans">Escolha um pacote</NuxtLink></p>
      </div>
    </div>
  </section>
</template>
