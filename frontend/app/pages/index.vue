<script setup lang="ts">
import { benefits, fallbackPlans } from '~/data/school'
import type { PackagePlan, SiteContent } from '~/types'

const { request } = useApi()

const { data: contentResponse, error: contentError } = await useAsyncData(
  'home-content',
  () => request<SiteContent[]>('/content'),
)

const { data: plansResponse, pending: plansPending, error: plansError } = await useAsyncData(
  'package-plans',
  () => request<PackagePlan[]>('/packages'),
)

const content = computed(() => contentResponse.value?.[0])
const plans = computed(() => plansResponse.value?.length ? plansResponse.value : fallbackPlans)
const { isAuthenticated } = useAuth()
const heroSearch = ref('')
const heroSearchMessage = ref('')

const classroomRoute = computed(() => isAuthenticated.value ? '/dashboard/streaming' : '/login')
const alertsRoute = computed(() => isAuthenticated.value ? '/dashboard/events' : '/login')

const heroSearchTargets = [
  { label: 'Student records', to: '/#student-records', keywords: 'student learner records enrollment profile' },
  { label: 'Teaching tools', to: '/#teaching-tools', keywords: 'course class teaching teacher learning lesson' },
  { label: 'Family communication', to: '/#family-communication', keywords: 'family parent communication announcement message' },
  { label: 'Reporting', to: '/#useful-reporting', keywords: 'report reporting attendance results analytics' },
  { label: 'Plans', to: '/#plans', keywords: 'plan package price pricing subscription' },
]

const submitHeroSearch = async () => {
  const query = heroSearch.value.trim().toLowerCase()
  const singularQuery = query.endsWith('s') ? query.slice(0, -1) : query

  if (!query) {
    heroSearchMessage.value = 'Enter a course or school feature to search for.'
    return
  }

  const match = heroSearchTargets.find((item) => {
    const searchableText = `${item.label} ${item.keywords}`.toLowerCase()
    return searchableText.includes(query) || searchableText.includes(singularQuery)
  })

  if (!match) {
    heroSearchMessage.value = `No feature found for ${heroSearch.value}. Try students, courses, parents, reports, or plans.`
    return
  }

  heroSearchMessage.value = `Opening ${match.label}.`
  heroSearch.value = ''
  await navigateTo(match.to)
}

const selectPlan = async (plan: PackagePlan) => {
  if (import.meta.client) localStorage.setItem('selectedPackage', JSON.stringify(plan))
  await navigateTo('/register')
}

useSeoMeta({
  title: 'School management that stays connected',
  description: 'Manage students, teachers, attendance, courses, reporting, and parent communication in one school platform.',
})
</script>

<template>
  <div>
    <section class="learning-hero" aria-labelledby="learning-hero-title">
      <span class="learning-hero__dot" aria-hidden="true" />

      <div class="learning-hero__copy">
        <NuxtLink class="learning-hero__eyebrow" to="/register">
          Get started with Lusivo
        </NuxtLink>

        <h1 id="learning-hero-title" class="learning-hero__title">
          <span>Develop the</span>
          <span>skillset &amp; your</span>
          <span class="learning-hero__highlight">Bright Future</span>
        </h1>

        <p class="learning-hero__description">
          {{ content?.subTitle || 'Connect administration, teaching, learning, and family communication in one dependable school workspace.' }}
        </p>

        <form class="learning-hero__search" role="search" @submit.prevent="submitHeroSearch">
          <label class="sr-only" for="hero-search">Find a course or school feature</label>
          <input
            id="hero-search"
            v-model="heroSearch"
            type="search"
            placeholder="Find your course"
            autocomplete="off"
          >
          <button type="submit" aria-label="Search school features">
            <Icon name="ph:magnifying-glass-bold" size="26" aria-hidden="true" />
          </button>
        </form>
        <p class="sr-only" aria-live="polite">{{ heroSearchMessage }}</p>

        <div class="learning-hero__stats" aria-label="Platform coverage">
          <div class="learning-stat">
            <span class="learning-stat__icon learning-stat__icon--warm">
              <Icon name="ph:book-open" size="30" aria-hidden="true" />
            </span>
            <span>
              <strong>15+</strong>
              <small>School tools</small>
            </span>
          </div>
          <div class="learning-stat">
            <span class="learning-stat__icon learning-stat__icon--cool">
              <Icon name="ph:student" size="30" aria-hidden="true" />
            </span>
            <span>
              <strong>5</strong>
              <small>User roles</small>
            </span>
          </div>
        </div>
      </div>

      <div class="learning-hero__visual" aria-label="A learner attending an online class">
        <span class="learning-hero__orbit" aria-hidden="true" />
        <div class="learning-hero__image-panel">
          <span class="learning-hero__panel-glow" aria-hidden="true" />
        </div>
        <img
          class="learning-hero__student"
          src="/images/lusivo-learner-hero.png"
          alt="A student wearing headphones while learning on a laptop"
          width="1536"
          height="1024"
          fetchpriority="high"
        >

        <article class="learning-class-card">
          <span class="learning-class-card__avatar">
            <img src="/images/lusivo-learner-hero.png" alt="">
          </span>
          <span class="learning-class-card__content">
            <strong>Mathematics class</strong>
            <small>Today at 1:00 pm</small>
            <NuxtLink :to="classroomRoute">Join now</NuxtLink>
          </span>
        </article>

        <NuxtLink class="learning-hero__bell" :to="alertsRoute" aria-label="Open school alerts">
          <Icon name="ph:bell-fill" size="26" aria-hidden="true" />
        </NuxtLink>

        <article class="learning-community-card">
          <div class="learning-community-card__avatars" aria-hidden="true">
            <span><img src="/images/lusivo-learner-hero.png" alt=""></span>
            <span>AM</span>
            <span>TK</span>
            <span><Icon name="ph:plus-bold" size="20" /></span>
          </div>
          <strong>15+ school tools</strong>
          <div class="learning-community-card__rating">
            <b>5 roles</b>
            <span aria-label="Five connected user roles">
              <Icon v-for="index in 5" :key="index" name="ph:star-fill" size="18" aria-hidden="true" />
            </span>
          </div>
        </article>

        <NuxtLink class="learning-hero__chat" to="/faq" aria-label="Get help with Lusivo">
          <Icon name="ph:chat-centered-text" size="30" aria-hidden="true" />
        </NuxtLink>
      </div>
    </section>

    <section class="learning-hero-mobile-cta" aria-label="Get started with Lusivo">
      <NuxtLink class="button button--primary" to="/register">
        Create account
        <Icon name="ph:arrow-right" size="19" aria-hidden="true" />
      </NuxtLink>
      <NuxtLink class="button button--secondary" to="/about">
        Explore platform
      </NuxtLink>
    </section>

    <section id="platform" class="section anchor-section">
      <div class="container">
        <div class="section-heading">
          <h2>{{ content?.subHeadings || 'The essentials stay within reach.' }}</h2>
          <p>Each part of the platform supports the same records, people, and school calendar.</p>
        </div>
        <div class="benefit-grid">
          <article
            v-for="(benefit, index) in benefits"
            :id="['student-records', 'teaching-tools', 'family-communication', 'useful-reporting'][index]"
            :key="benefit.title"
            class="benefit-card anchor-section"
          >
            <div class="benefit-card__icon">
              <Icon :name="benefit.icon" aria-hidden="true" />
            </div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="plans" class="section plans-section anchor-section">
      <div class="container">
        <div class="section-heading">
          <h2>Choose what fits your school.</h2>
          <p>Start with the operational essentials or bring the complete academic experience together.</p>
        </div>

        <AppAlert
          v-if="plansError || contentError"
          type="info"
          message="Live website content is unavailable, so the built-in plan information is shown instead."
          style="margin-bottom: 1rem"
        />

        <div v-if="plansPending" class="plans-grid" aria-label="Loading plans">
          <AppSkeleton height="410px" />
          <AppSkeleton height="410px" />
        </div>
        <div v-else class="plans-grid">
          <PlanCard
            v-for="(plan, index) in plans"
            :key="String(plan._id || plan.id || plan.name)"
            :plan="plan"
            :featured="index === 1"
            @select="selectPlan"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container story-grid">
        <img src="/images/school.webp" alt="A large school lecture room" width="640" height="520" loading="lazy">
        <div>
          <h2>Designed around how schools work.</h2>
          <p>{{ content?.description || 'Reliable school operations depend on clear records and timely communication. The platform keeps both in one place.' }}</p>
          <div class="story-points">
            <div class="story-point">
              <div class="story-point__icon"><Icon name="ph:shield-check" aria-hidden="true" /></div>
              <div><h3>Role-aware access</h3><p>People see the tools and information relevant to their responsibilities.</p></div>
            </div>
            <div class="story-point">
              <div class="story-point__icon"><Icon name="ph:devices" aria-hidden="true" /></div>
              <div><h3>Ready across devices</h3><p>Core workflows remain clear on desktops, tablets, and mobile screens.</p></div>
            </div>
            <div class="story-point">
              <div class="story-point__icon"><Icon name="ph:database" aria-hidden="true" /></div>
              <div><h3>Connected to your API</h3><p>Content, packages, accounts, and school records use the existing backend.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
