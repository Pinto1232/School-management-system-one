<script setup lang="ts">
useSeoMeta({ title: 'Recuperar palavra-passe', robots: 'noindex' })
</script>

<template>
  <section class="section">
    <div class="container--narrow" style="max-width: 480px">
      <div class="panel auth-card" style="padding: clamp(1.5rem, 5vw, 2.5rem)">
        <div class="auth-card__header">
          <h1>Recupere a sua palavra-passe</h1>
          <p>A recuperação automática está desativada até o servidor de e-mail do Keycloak ser configurado.</p>
        </div>
        <div class="form-stack">
          <AppAlert type="info" message="Peça ao administrador do Keycloak para redefinir a sua palavra-passe. Depois de configurar SMTP, a recuperação automática pode ser ativada." />
        </div>
        <p class="auth-card__footer"><NuxtLink class="text-link" to="/login">Voltar ao início de sessão</NuxtLink></p>
      </div>
    </div>
  </section>
</template>
