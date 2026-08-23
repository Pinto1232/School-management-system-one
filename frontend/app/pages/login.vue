<script setup lang="ts">
const { authError, isAuthenticated, login } = useAuth()
const route = useRoute()
const redirecting = ref(route.query.retry !== 'false')
const message = ref('')

const redirectPath = computed(() => {
  const redirect = Array.isArray(route.query.redirect)
    ? route.query.redirect[0]
    : route.query.redirect

  return typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')
    ? redirect
    : '/dashboard'
})

const startLogin = async () => {
  redirecting.value = true
  message.value = ''

  try {
    if (isAuthenticated.value) {
      await navigateTo(redirectPath.value)
      return
    }

    await login(redirectPath.value)
  } catch {
    message.value = 'Não foi possível abrir o início de sessão do Keycloak.'
    redirecting.value = false
  }
}

onMounted(() => {
  if (route.query.retry === 'false') {
    message.value = 'Não foi possível ligar ao Keycloak. Tente novamente.'
    return
  }

  void startLogin()
})

useSeoMeta({ title: 'Iniciar sessão', robots: 'noindex' })
</script>

<template>
  <section class="section" aria-labelledby="login-title">
    <div class="container--narrow" style="max-width: 480px">
      <div class="panel auth-card" style="padding: clamp(1.5rem, 5vw, 2.5rem)">
        <div class="auth-card__header">
          <h1 id="login-title">A abrir o início de sessão seguro</h1>
          <p v-if="redirecting">Está a ser encaminhado para o Keycloak.</p>
          <p v-else>Não foi possível iniciar o encaminhamento automático.</p>
        </div>

        <div class="form-stack" aria-live="polite">
          <AppAlert v-if="authError || message" type="error" :message="message || authError" />

          <div v-if="redirecting" class="button button--primary" role="status">
            <Icon class="login-card__spinner" name="ph:circle-notch" size="19" aria-hidden="true" />
            A abrir o Keycloak...
          </div>

          <button v-else class="button button--primary" type="button" @click="startLogin">
            <Icon name="ph:sign-in" size="20" aria-hidden="true" />
            Tentar novamente
          </button>

          <NuxtLink v-if="!redirecting" class="button button--secondary" to="/">
            Voltar à página inicial
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
