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
    message.value = getApiErrorMessage(error, 'Esta ligação de recuperação é inválida ou expirou.')
  } finally {
    validating.value = false
  }
}

const submit = async () => {
  message.value = ''
  if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password.value)) {
    message.value = 'Utilize pelo menos 6 caracteres, incluindo uma letra e um número.'
    return
  }
  if (password.value !== confirmPassword.value) {
    message.value = 'As palavras-passe não coincidem.'
    return
  }

  submitting.value = true
  try {
    const response = await request<{ message?: string }>('/reset-password/update-password', {
      method: 'POST',
      body: { userEmail: userEmail.value, password: password.value },
    })
    success.value = true
    message.value = translateApiMessage(response.message, 'A sua palavra-passe foi atualizada.')
  } catch (error) {
    message.value = getApiErrorMessage(error, 'Não foi possível atualizar a sua palavra-passe.')
  } finally {
    submitting.value = false
  }
}

onMounted(validateToken)
useSeoMeta({ title: 'Escolher uma nova palavra-passe', robots: 'noindex' })
</script>

<template>
  <section class="section">
    <div class="container--narrow" style="max-width: 480px">
      <div class="panel auth-card" style="padding: clamp(1.5rem, 5vw, 2.5rem)">
        <div class="auth-card__header">
          <h1>Escolha uma nova palavra-passe</h1>
          <p v-if="validating">A verificar a ligação de recuperação.</p>
          <p v-else-if="valid">A repor a palavra-passe de {{ userEmail }}.</p>
          <p v-else>Não é possível utilizar esta ligação de recuperação.</p>
        </div>

        <div v-if="validating" class="form-stack" aria-label="A validar a ligação de recuperação">
          <AppSkeleton height="46px" />
          <AppSkeleton height="46px" />
          <AppSkeleton height="46px" />
        </div>

        <AppAlert v-else-if="!valid" type="error" :message="message" />

        <div v-else-if="success" class="form-stack">
          <AppAlert type="success" :message="message" />
          <NuxtLink class="button button--primary" to="/login">Iniciar sessão</NuxtLink>
        </div>

        <form v-else class="form-stack" novalidate @submit.prevent="submit">
          <AppAlert v-if="message" type="error" :message="message" />
          <div class="field">
            <label for="new-password">Nova palavra-passe</label>
            <input id="new-password" v-model="password" type="password" autocomplete="new-password" placeholder="Introduza uma nova palavra-passe">
            <p class="field__helper">Pelo menos 6 caracteres, incluindo um número.</p>
          </div>
          <div class="field">
            <label for="confirm-password">Confirmar palavra-passe</label>
            <input id="confirm-password" v-model="confirmPassword" type="password" autocomplete="new-password" placeholder="Repita a nova palavra-passe">
          </div>
          <button class="button button--primary" type="submit" :disabled="submitting">
            {{ submitting ? 'A atualizar a palavra-passe...' : 'Atualizar palavra-passe' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
