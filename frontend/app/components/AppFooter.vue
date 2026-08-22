<script setup lang="ts">
const { isAuthenticated } = useAuth()

const year = new Date().getFullYear()
const dashboardRoute = computed(() => isAuthenticated.value ? '/dashboard' : '/login')
const coursesRoute = computed(() => isAuthenticated.value ? '/dashboard/courses' : '/login')
const reportsRoute = computed(() => isAuthenticated.value ? '/dashboard/reports' : '/login')

const companyLinks = [
  { label: 'Sobre nós', to: '/about' },
  { label: 'Contacte-nos', to: '/faq' },
  { label: 'Planos', to: '/#plans' },
  { label: 'Centro de ajuda', to: '/faq' },
  { label: 'Criar conta', to: '/register' },
]

const communityLinks = [
  { label: 'Documentação', to: '/faq' },
  { label: 'Perguntas frequentes', to: '/faq' },
]

const teachingLinks = computed(() => [
  { label: 'Disciplinas', to: coursesRoute.value },
  { label: 'Relatórios', to: reportsRoute.value },
])

const scrollToTop = () => {
  if (!import.meta.client) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <section class="site-footer__about" aria-labelledby="footer-brand-title">
        <NuxtLink class="footer-brand" to="/" aria-label="Página inicial da Lusivo">
          <BrandLogo />
          <span id="footer-brand-title">Lusivo</span>
        </NuxtLink>
        <p>A Lusivo liga a administração escolar, o ensino, a aprendizagem e a comunicação com as famílias num espaço de trabalho fiável.</p>

        <div class="footer-socials" aria-label="Redes sociais da Lusivo">
          <span title="Facebook"><Icon name="ph:facebook-logo-fill" size="20" aria-hidden="true" /></span>
          <span title="Instagram"><Icon name="ph:instagram-logo" size="20" aria-hidden="true" /></span>
          <span title="X"><Icon name="ph:x-logo" size="20" aria-hidden="true" /></span>
          <span title="LinkedIn"><Icon name="ph:linkedin-logo-fill" size="20" aria-hidden="true" /></span>
        </div>
      </section>

      <section class="footer-column" aria-labelledby="footer-company-title">
        <h2 id="footer-company-title">Empresa</h2>
        <nav aria-label="Ligações da empresa">
          <NuxtLink v-for="item in companyLinks" :key="item.label" :to="item.to">{{ item.label }}</NuxtLink>
        </nav>
      </section>

      <section class="footer-column" aria-labelledby="footer-community-title">
        <h2 id="footer-community-title">Comunidade</h2>
        <nav aria-label="Ligações da comunidade">
          <NuxtLink v-for="item in communityLinks" :key="item.label" :to="item.to">{{ item.label }}</NuxtLink>
        </nav>
      </section>

      <section class="footer-column" aria-labelledby="footer-teaching-title">
        <h2 id="footer-teaching-title">Ensino</h2>
        <nav aria-label="Ligações de ensino">
          <NuxtLink v-for="item in teachingLinks" :key="item.label" :to="item.to">{{ item.label }}</NuxtLink>
        </nav>
      </section>

      <section class="footer-column footer-contact" aria-labelledby="footer-contact-title">
        <h2 id="footer-contact-title">Contacto</h2>
        <p><span>Centro de ajuda:</span> <NuxtLink to="/faq">Consultar respostas de suporte</NuxtLink></p>
        <p><span>Conta:</span> <NuxtLink :to="dashboardRoute">{{ isAuthenticated ? 'Abrir a sua escola' : 'Iniciar sessão na Lusivo' }}</NuxtLink></p>

        <div class="footer-app-links" aria-label="Abrir a plataforma Lusivo">
          <NuxtLink class="footer-app-link" to="/#plans">
            <Icon name="ph:google-play-logo-fill" size="27" aria-hidden="true" />
            <span><small>COMEÇAR NA</small><strong>Lusivo Web</strong></span>
          </NuxtLink>
          <NuxtLink class="footer-app-link" :to="dashboardRoute">
            <Icon name="ph:apple-logo-fill" size="29" aria-hidden="true" />
            <span><small>ABRIR NO SEU</small><strong>Navegador</strong></span>
          </NuxtLink>
        </div>
      </section>
    </div>

    <div class="container site-footer__legal">
      <p>Copyright ©{{ year }} Lusivo. Todos os direitos reservados.</p>
      <div class="site-footer__legal-links">
        <span class="footer-language" aria-label="Idioma do site: Português">
          <Icon name="ph:globe" size="19" aria-hidden="true" />
          Português
        </span>
        <NuxtLink to="/faq">Termos de utilização</NuxtLink>
        <NuxtLink to="/faq">Política de privacidade</NuxtLink>
        <button type="button" aria-label="Voltar ao topo" @click="scrollToTop">
          <Icon name="ph:arrow-up" size="24" aria-hidden="true" />
        </button>
      </div>
    </div>
  </footer>
</template>
