<script setup lang="ts">
import { fallbackPlans } from '~/data/school'
import type { PackagePlan } from '~/types'

const plansQuery = usePackagePlansQuery()
const plans = computed(() => (
  plansQuery.data.value?.length ? plansQuery.data.value : fallbackPlans
).map(localisePackagePlan))
const { isAuthenticated, initialiseAuth, login, user } = useAuth()
const {
  feedbackQuery,
  favourites: favouritePlans,
  pendingPlanKeys,
  updateFeedback,
} = usePackageFeedback(
  computed(() => user.value?.id),
  isAuthenticated,
)
const { cartItem, initialiseCart, addToCart, clearCart } = useSchoolCart()
const heroSearch = ref('')
const heroSearchMessage = ref('')
const selectedPlan = ref<PackagePlan | null>(null)
const planDrawerOpen = ref(false)
const feedbackMessage = ref('')

const classroomRoute = computed(() => isAuthenticated.value ? '/dashboard/streaming' : '/login')
const alertsRoute = computed(() => isAuthenticated.value ? '/dashboard/events' : '/login')

const heroSearchTargets = [
  { label: 'Planos', to: '/#plans', keywords: 'plano pacote preço subscrição' },
  { label: 'Sobre', to: '/about', keywords: 'sobre escola plataforma lusivo' },
  { label: 'Centro de ajuda', to: '/faq', keywords: 'ajuda suporte perguntas frequentes' },
]

const submitHeroSearch = async () => {
  const query = heroSearch.value.trim().toLowerCase()
  const singularQuery = query.endsWith('s') ? query.slice(0, -1) : query

  if (!query) {
    heroSearchMessage.value = 'Introduza uma disciplina ou funcionalidade escolar para pesquisar.'
    return
  }

  const match = heroSearchTargets.find((item) => {
    const searchableText = `${item.label} ${item.keywords}`.toLowerCase()
    return searchableText.includes(query) || searchableText.includes(singularQuery)
  })

  if (!match) {
    heroSearchMessage.value = `Não foi encontrada nenhuma página para ${heroSearch.value}. Tente planos, sobre ou ajuda.`
    return
  }

  heroSearchMessage.value = `A abrir ${match.label}.`
  heroSearch.value = ''
  await navigateTo(match.to)
}

const planIdentity = (plan: PackagePlan | null) => String(plan?._id || plan?.id || plan?.name || '')
const isPlanInCart = (plan: PackagePlan | null) => Boolean(
  plan && cartItem.value && planIdentity(cartItem.value) === planIdentity(plan),
)
const isPlanLiked = (plan: PackagePlan) => Boolean(favouritePlans.value[planIdentity(plan)])

const togglePlanFavourite = async (plan: PackagePlan) => {
  const authenticated = isAuthenticated.value || await initialiseAuth()
  if (!authenticated) {
    await login('/#plans')
    return
  }

  const planKey = planIdentity(plan)
  if (!planKey || pendingPlanKeys.value.has(planKey)) return

  const liked = !favouritePlans.value[planKey]
  feedbackMessage.value = liked
    ? `${plan.name} foi adicionado aos favoritos.`
    : `${plan.name} foi removido dos favoritos.`

  try {
    await updateFeedback.mutateAsync({ planKey, liked })
  } catch {
    feedbackMessage.value = 'Não foi possível guardar o favorito. Tente novamente.'
  }
}

const openPlanDetails = (plan: PackagePlan) => {
  selectedPlan.value = plan
  planDrawerOpen.value = true
}

const closePlanDetails = () => {
  planDrawerOpen.value = false
}

const addSelectedPlanToCart = (plan: PackagePlan) => {
  addToCart(plan)
  selectedPlan.value = plan
}

const removeSelectedPlanFromCart = () => {
  clearCart()
}

onMounted(async () => {
  initialiseCart()
  await initialiseAuth()
})

onServerPrefetch(async () => {
  try {
    await plansQuery.suspense()
  } catch {
    // The page deliberately renders local plans when the public API is unavailable.
  }
})

watch(() => feedbackQuery.error.value, (error) => {
  if (error) feedbackMessage.value = 'Não foi possível carregar os seus favoritos.'
})

useSeoMeta({
  title: 'Gestão escolar sempre ligada',
  description: 'Faça a gestão de alunos, professores, presenças, disciplinas, relatórios e comunicação com as famílias numa única plataforma.',
})
</script>

<template>
  <div>
    <section class="learning-hero" aria-labelledby="learning-hero-title">
      <span class="learning-hero__dot" aria-hidden="true" />

      <div class="learning-hero__copy">
        <NuxtLink class="learning-hero__eyebrow" to="/#plans">
          Comece com a Lusivo
        </NuxtLink>

        <h1 id="learning-hero-title" class="learning-hero__title">
          <span>Desenvolva as</span>
          <span>competências para um</span>
          <span class="learning-hero__highlight">Futuro brilhante</span>
        </h1>

        <p class="learning-hero__description">
          Ligue a administração, o ensino, a aprendizagem e a comunicação com as famílias num espaço escolar fiável.
        </p>

        <form class="learning-hero__search" role="search" @submit.prevent="submitHeroSearch">
          <label class="sr-only" for="hero-search">Encontrar uma disciplina ou funcionalidade escolar</label>
          <input
            id="hero-search"
            v-model="heroSearch"
            type="search"
            placeholder="Pesquisar na Lusivo"
            autocomplete="off"
          >
          <button type="submit" aria-label="Pesquisar funcionalidades escolares">
            <Icon name="ph:magnifying-glass-bold" size="26" aria-hidden="true" />
          </button>
        </form>
        <p class="sr-only" aria-live="polite">{{ heroSearchMessage }}</p>

        <div class="learning-hero__stats" aria-label="Cobertura da plataforma">
          <div class="learning-stat">
            <span class="learning-stat__icon learning-stat__icon--warm">
              <Icon name="ph:book-open" size="30" aria-hidden="true" />
            </span>
            <span>
              <strong>15+</strong>
              <small>Ferramentas escolares</small>
            </span>
          </div>
          <div class="learning-stat">
            <span class="learning-stat__icon learning-stat__icon--cool">
              <Icon name="ph:student" size="30" aria-hidden="true" />
            </span>
            <span>
              <strong>5</strong>
              <small>Perfis de utilizador</small>
            </span>
          </div>
        </div>
      </div>

      <div class="learning-hero-mobile-cta" aria-label="Começar com a Lusivo">
        <NuxtLink class="button button--primary" to="/register">
          Criar conta
          <Icon name="ph:arrow-right" size="19" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink class="button button--secondary" to="/about">
          Explorar plataforma
        </NuxtLink>
      </div>

      <div class="learning-hero__visual" aria-label="Uma aluna a participar numa aula online">
        <span class="learning-hero__orbit" aria-hidden="true" />
        <div class="learning-hero__image-panel">
          <span class="learning-hero__panel-glow" aria-hidden="true" />
        </div>
        <img
          class="learning-hero__student"
          src="/images/lusivo-learner-hero.webp"
          alt="Uma aluna com auscultadores a estudar num computador portátil"
          width="1536"
          height="1024"
          fetchpriority="high"
        >

        <article class="learning-class-card">
          <span class="learning-class-card__avatar">
            <img src="/images/lusivo-learner-hero.webp" alt="">
          </span>
          <span class="learning-class-card__content">
            <strong>Aula de Matemática</strong>
            <small>Hoje às 13:00</small>
            <NuxtLink :to="classroomRoute">Entrar agora</NuxtLink>
          </span>
        </article>

        <NuxtLink class="learning-hero__bell" :to="alertsRoute" aria-label="Abrir alertas da escola">
          <Icon name="ph:bell-fill" size="26" aria-hidden="true" />
        </NuxtLink>

        <article class="learning-community-card">
          <div class="learning-community-card__avatars" aria-hidden="true">
            <span><img src="/images/lusivo-learner-hero.webp" alt=""></span>
            <span>AM</span>
            <span>TK</span>
            <span><Icon name="ph:plus-bold" size="20" /></span>
          </div>
          <strong>Mais de 15 ferramentas</strong>
          <div class="learning-community-card__rating">
            <b>5 perfis</b>
            <span aria-label="Cinco perfis de utilizador ligados">
              <Icon v-for="index in 5" :key="index" name="ph:star-fill" size="18" aria-hidden="true" />
            </span>
          </div>
        </article>

        <NuxtLink class="learning-hero__chat" to="/faq" aria-label="Obter ajuda com a Lusivo">
          <Icon name="ph:chat-centered-text" size="30" aria-hidden="true" />
        </NuxtLink>
      </div>
    </section>

    <section id="plans" class="section plans-section anchor-section">
      <div class="container">
        <div class="section-heading plans-section__heading">
          <h2>Escolha o que melhor se adapta à sua escola.</h2>
          <p>Comece com o essencial para as operações ou reúna toda a experiência académica.</p>
        </div>

        <div class="plans-grid">
          <PlanCard
            v-for="(plan, index) in plans"
            :key="String(plan._id || plan.id || plan.name)"
            :plan="plan"
            :featured="index === 1"
            :in-cart="isPlanInCart(plan)"
            :liked="isPlanLiked(plan)"
            :feedback-pending="pendingPlanKeys.has(planIdentity(plan))"
            :variant="isPlanInCart(plan) ? 'docked' : 'inline'"
            @view="openPlanDetails"
            @favourite="togglePlanFavourite"
          />
        </div>
        <p class="sr-only" aria-live="polite">{{ feedbackMessage }}</p>
      </div>
    </section>

    <PlanDetailsDrawer
      :open="planDrawerOpen"
      :plan="selectedPlan"
      :in-cart="isPlanInCart(selectedPlan)"
      @close="closePlanDetails"
      @add="addSelectedPlanToCart"
      @remove="removeSelectedPlanFromCart"
    />

  </div>
</template>
