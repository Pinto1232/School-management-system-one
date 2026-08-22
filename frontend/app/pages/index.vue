<script setup lang="ts">
import { benefits, fallbackPlans } from '~/data/school'
import type { PackagePlan, SiteContent } from '~/types'

const { request, uploadUrl } = useApi()

const { data: contentResponse, pending: contentPending, error: contentError } = await useAsyncData(
  'home-content',
  () => request<SiteContent[]>('/content'),
)

const { data: plansResponse, pending: plansPending, error: plansError } = await useAsyncData(
  'package-plans',
  () => request<PackagePlan[]>('/packages'),
)

const content = computed(() => contentResponse.value?.[0])
const plans = computed(() => plansResponse.value?.length ? plansResponse.value : fallbackPlans)

const heroImage = computed(() => {
  const image = content.value?.images?.[2]?.path || content.value?.images?.[0]?.path
  return image ? uploadUrl(image) : '/images/about-us.webp'
})

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
    <section class="container hero">
      <div class="hero__copy">
        <span class="eyebrow">One connected school</span>
        <h1>{{ content?.title || 'Run every school day with clarity.' }}</h1>
        <p>{{ content?.subTitle || 'Bring administration, teaching, learning, and family communication into one dependable workspace.' }}</p>
        <div class="hero__actions">
          <NuxtLink class="button button--primary" to="/register">
            {{ content?.buttonsTitle?.[0] || 'Create account' }}
            <Icon name="ph:arrow-right" size="19" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink class="button button--secondary" to="/about">Explore platform</NuxtLink>
        </div>
      </div>
      <div class="hero__visual">
        <AppSkeleton v-if="contentPending" height="500px" />
        <img
          v-else
          class="hero__image"
          :src="heroImage"
          alt="A teacher leading learners in a classroom"
          width="760"
          height="500"
          fetchpriority="high"
        >
        <div class="hero__note">
          <strong>Everything in context</strong>
          <span>Attendance, learning, people, and communication stay connected.</span>
        </div>
      </div>
    </section>

    <section class="trust-strip" aria-label="Platform coverage">
      <div class="container trust-strip__inner">
        <div>
          <strong>One workspace</strong>
          <span>Built around the full school day</span>
        </div>
        <div>
          <strong>15</strong>
          <span>Management areas</span>
        </div>
        <div>
          <strong>5 roles</strong>
          <span>Staff, teachers, learners, parents, admins</span>
        </div>
        <div>
          <strong>Any screen</strong>
          <span>Responsive by default</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <h2>{{ content?.subHeadings || 'The essentials stay within reach.' }}</h2>
          <p>Each part of the platform supports the same records, people, and school calendar.</p>
        </div>
        <div class="benefit-grid">
          <article v-for="benefit in benefits" :key="benefit.title" class="benefit-card">
            <div class="benefit-card__icon">
              <Icon :name="benefit.icon" aria-hidden="true" />
            </div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section plans-section">
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
