<script setup lang="ts">
import { faqs } from '~/data/school'

useSeoMeta({
  title: 'Frequently asked questions',
  description: 'Answers about the Lusivo platform, users, school features, devices, and reporting.',
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container page-hero__inner">
        <h1>Answers for your school team.</h1>
        <p>Start with the most common questions about access, academic tools, communication, and reporting.</p>
      </div>
    </section>

    <section class="section">
      <div class="container--narrow">
        <div class="faq-list">
          <details v-for="(item, index) in faqs" :key="item.question" class="faq-item" :open="index === 0">
            <summary>
              {{ item.question }}
              <Icon name="ph:plus" size="19" aria-hidden="true" />
            </summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>
