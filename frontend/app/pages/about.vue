<script setup lang="ts">
const milestones = [
  { title: 'One reliable record', text: 'Student, teacher, course, attendance, and finance information belongs to the same school context.' },
  { title: 'Less administrative repetition', text: 'Common updates move through shared workflows so staff do not need to maintain separate copies.' },
  { title: 'Clearer family communication', text: 'Parents can understand progress, attendance, fees, announcements, and upcoming school events.' },
]
const milestoneIcons = ['ph:database', 'ph:arrows-clockwise', 'ph:chats-circle'] as const
const milestoneIcon = (index: number) => milestoneIcons[index] || 'ph:check-circle'

useSeoMeta({
  title: 'About',
  description: 'Learn why Lusivo connects administration, teaching, learning, and family communication.',
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container page-hero__inner">
        <h1>School work deserves one clear system.</h1>
        <p>We bring daily operations and learning information together so every school role can act with context.</p>
      </div>
    </section>

    <section class="section">
      <div class="container story-grid">
        <img src="/images/aboutUs.png" alt="School community working together" width="640" height="520">
        <div>
          <span class="eyebrow">Why it exists</span>
          <h2>Built for the people behind every school day.</h2>
          <p>Administrative records, classroom work, and parent communication often sit in separate tools. Lusivo is designed to reconnect them.</p>
          <p>The result is a practical workspace that supports decisions without making staff learn several disconnected systems.</p>
        </div>
      </div>
    </section>

    <section class="section plans-section">
      <div class="container">
        <div class="section-heading">
          <h2>How the platform helps</h2>
          <p>The product is organised around three outcomes that matter across the school community.</p>
        </div>
        <div class="story-points">
          <div v-for="(item, index) in milestones" :key="item.title" class="story-point">
            <div class="story-point__icon"><Icon :name="milestoneIcon(index)" aria-hidden="true" /></div>
            <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
