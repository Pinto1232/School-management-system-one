<script setup lang="ts">
const { isAuthenticated } = useAuth()

const year = new Date().getFullYear()
const dashboardRoute = computed(() => isAuthenticated.value ? '/dashboard' : '/login')
const coursesRoute = computed(() => isAuthenticated.value ? '/dashboard/courses' : '/login')
const reportsRoute = computed(() => isAuthenticated.value ? '/dashboard/reports' : '/login')

const companyLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Contact us', to: '/faq' },
  { label: 'Plans', to: '/#plans' },
  { label: 'Help centre', to: '/faq' },
  { label: 'Create account', to: '/register' },
]

const communityLinks = [
  { label: 'Documentation', to: '/faq' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Family communication', to: '/#family-communication' },
  { label: 'Platform map', to: '/#platform' },
]

const teachingLinks = computed(() => [
  { label: 'Teaching tools', to: '/#teaching-tools' },
  { label: 'Courses', to: coursesRoute.value },
  { label: 'Reports', to: reportsRoute.value },
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
        <NuxtLink class="footer-brand" to="/" aria-label="Lusivo home">
          <BrandLogo />
          <span id="footer-brand-title">Lusivo</span>
        </NuxtLink>
        <p>Lusivo connects school administration, teaching, learning, and family communication in one dependable workspace.</p>

        <div class="footer-socials" aria-label="Lusivo social platforms">
          <span title="Facebook"><Icon name="ph:facebook-logo-fill" size="20" aria-hidden="true" /></span>
          <span title="Instagram"><Icon name="ph:instagram-logo" size="20" aria-hidden="true" /></span>
          <span title="X"><Icon name="ph:x-logo" size="20" aria-hidden="true" /></span>
          <span title="LinkedIn"><Icon name="ph:linkedin-logo-fill" size="20" aria-hidden="true" /></span>
        </div>
      </section>

      <section class="footer-column" aria-labelledby="footer-company-title">
        <h2 id="footer-company-title">Company</h2>
        <nav aria-label="Company links">
          <NuxtLink v-for="item in companyLinks" :key="item.label" :to="item.to">{{ item.label }}</NuxtLink>
        </nav>
      </section>

      <section class="footer-column" aria-labelledby="footer-community-title">
        <h2 id="footer-community-title">Community</h2>
        <nav aria-label="Community links">
          <NuxtLink v-for="item in communityLinks" :key="item.label" :to="item.to">{{ item.label }}</NuxtLink>
        </nav>
      </section>

      <section class="footer-column" aria-labelledby="footer-teaching-title">
        <h2 id="footer-teaching-title">Teaching</h2>
        <nav aria-label="Teaching links">
          <NuxtLink v-for="item in teachingLinks" :key="item.label" :to="item.to">{{ item.label }}</NuxtLink>
        </nav>
      </section>

      <section class="footer-column footer-contact" aria-labelledby="footer-contact-title">
        <h2 id="footer-contact-title">Contact</h2>
        <p><span>Help centre:</span> <NuxtLink to="/faq">Browse support answers</NuxtLink></p>
        <p><span>Account:</span> <NuxtLink :to="dashboardRoute">{{ isAuthenticated ? 'Open your school' : 'Log in to Lusivo' }}</NuxtLink></p>

        <div class="footer-app-links" aria-label="Open the Lusivo platform">
          <NuxtLink class="footer-app-link" to="/register">
            <Icon name="ph:google-play-logo-fill" size="27" aria-hidden="true" />
            <span><small>GET STARTED ON</small><strong>Lusivo Web</strong></span>
          </NuxtLink>
          <NuxtLink class="footer-app-link" :to="dashboardRoute">
            <Icon name="ph:apple-logo-fill" size="29" aria-hidden="true" />
            <span><small>OPEN IN YOUR</small><strong>Browser</strong></span>
          </NuxtLink>
        </div>
      </section>
    </div>

    <div class="container site-footer__legal">
      <p>Copyright ©{{ year }} Lusivo. All rights reserved.</p>
      <div class="site-footer__legal-links">
        <span class="footer-language" aria-label="Site language: English">
          <Icon name="ph:globe" size="19" aria-hidden="true" />
          English
          <Icon name="ph:caret-up-bold" size="13" aria-hidden="true" />
        </span>
        <NuxtLink to="/faq">Terms of use</NuxtLink>
        <NuxtLink to="/faq">Privacy policy</NuxtLink>
        <button type="button" aria-label="Back to top" @click="scrollToTop">
          <Icon name="ph:arrow-up" size="24" aria-hidden="true" />
        </button>
      </div>
    </div>
  </footer>
</template>
