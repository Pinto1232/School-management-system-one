import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  devtools: { enabled: false },
  modules: ['@nuxt/icon'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001/api',
      backendUrl: 'http://localhost:3001',
    },
  },
  app: {
    head: {
      titleTemplate: '%s | Lusivo',
      meta: [
        { name: 'description', content: 'School administration, learning, and family communication in one place.' },
        { name: 'theme-color', content: '#001b51' },
      ],
    },
  },
  icon: {
    clientBundle: {
      scan: true,
      icons: ['ph:chat-circle-text', 'ph:chart-line-up'],
      sizeLimitKb: 256,
    },
  },
  typescript: {
    typeCheck: false,
  },
})
