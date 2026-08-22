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
          <p>A autenticação segura e a sessão da sua conta são geridas pelo Keycloak.</p>
        </div>

        <div class="form-stack">
          <AppAlert v-if="notice" type="success" :message="notice" />
          <AppAlert v-if="authError || message" type="error" :message="message || authError" />

          <button class="button button--primary" type="button" :disabled="!ready || submitting" style="width: 100%" @click="submit">
            <Icon v-if="submitting || !ready" name="ph:circle-notch" size="19" aria-hidden="true" />
            {{ submitting ? 'A abrir o Keycloak...' : ready ? 'Continuar para iniciar sessão' : 'A ligar ao Keycloak...' }}
          </button>

          <p class="field__helper">Será encaminhado para o serviço de identidade da escola e regressará ao painel depois de entrar.</p>
        </div>

        <p class="auth-card__footer">Ainda não utiliza a Lusivo? <NuxtLink class="text-link" to="/#plans">Escolha um pacote</NuxtLink></p>
      </div>
    </div>
  </section>
</template>
