<script setup lang="ts">
const { authError, initialiseAuth, isAuthenticated, login, ready } = useAuth()
const route = useRoute()
const submitting = ref(false)
const message = ref('')
const notice = computed(() => route.query.subscription === 'test-complete'
  ? 'A subscrição de teste foi concluída. Inicie sessão para continuar.'
  : '')

const submit = async () => {
  submitting.value = true
  message.value = ''
  try {
    await login('/dashboard')
  } catch {
    message.value = 'Não foi possível abrir o início de sessão do Keycloak.'
    submitting.value = false
  }
}

onMounted(async () => {
  await initialiseAuth()
  if (isAuthenticated.value) await navigateTo('/dashboard')
})

useSeoMeta({ title: 'Iniciar sessão', robots: 'noindex' })
</script>

<template>
  <section class="auth-shell login-shell" aria-labelledby="login-title">
    <div class="auth-shell__visual">
      <img src="/images/school.webp" alt="Uma grande sala de aulas" width="1200" height="900">
      <div class="auth-shell__visual-copy">
        <h2>Bem-vindo de volta.</h2>
        <p>Abra o painel da sua escola e continue a acompanhar as pessoas, turmas e tarefas que precisam de atenção.</p>
      </div>
    </div>

    <div class="auth-shell__form login-shell__form">
      <div class="login-panel">
        <NuxtLink class="login-panel__back" to="/">
          <Icon name="ph:arrow-left" size="18" aria-hidden="true" />
          Voltar à página inicial
        </NuxtLink>

        <div class="auth-card login-card">
          <span class="login-card__icon" aria-hidden="true">
            <Icon name="ph:shield-check" size="25" />
          </span>

          <div class="auth-card__header">
            <h1 id="login-title">Iniciar sessão na sua escola</h1>
            <p>Utilize a conta associada à sua escola para aceder ao painel de gestão.</p>
          </div>

          <div class="form-stack">
            <AppAlert v-if="notice" type="success" :message="notice" />
            <AppAlert v-if="authError || message" type="error" :message="message || authError" />

            <button class="button button--primary login-card__submit" type="button" :disabled="!ready || submitting" @click="submit">
              <Icon v-if="submitting || !ready" class="login-card__spinner" name="ph:circle-notch" size="19" aria-hidden="true" />
              <Icon v-else name="ph:sign-in" size="20" aria-hidden="true" />
              {{ submitting ? 'A abrir o Keycloak...' : ready ? 'Continuar para iniciar sessão' : 'A ligar ao Keycloak...' }}
            </button>

            <div class="login-card__security-note">
              <Icon name="ph:lock-key" size="20" aria-hidden="true" />
              <p>As credenciais são introduzidas diretamente no Keycloak. Depois de entrar, regressará ao painel da sua escola.</p>
            </div>
          </div>

          <p class="auth-card__footer">Ainda não utiliza a Lusivo? <NuxtLink class="text-link" to="/#plans">Escolha um pacote</NuxtLink></p>
        </div>
      </div>
    </div>
  </section>
</template>
