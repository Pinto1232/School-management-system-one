<script setup lang="ts">
useSeoMeta({ title: 'Recuperar palavra-passe', robots: 'noindex' })
</script>

<template>
  <section class="section">
    <div class="container--narrow" style="max-width: 480px">
      <div class="panel auth-card" style="padding: clamp(1.5rem, 5vw, 2.5rem)">
        <div class="auth-card__header">
          <h1>A recuperação mudou para o Keycloak</h1>
          <p>As ligações antigas já não alteram a credencial da sua conta. Peça ao administrador do Keycloak para redefinir a palavra-passe.</p>
        </div>
        <div class="form-stack">
          <NuxtLink class="button button--primary" to="/login">Voltar ao início de sessão</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
