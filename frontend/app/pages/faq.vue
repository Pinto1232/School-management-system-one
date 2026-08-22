<script setup lang="ts">
import { faqs } from '~/data/school'

useSeoMeta({
  title: 'Perguntas frequentes',
  description: 'Respostas sobre a plataforma Lusivo, utilizadores, funcionalidades escolares, dispositivos e relatórios.',
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container page-hero__inner">
        <h1>Respostas para a sua equipa escolar.</h1>
        <p>Comece pelas perguntas mais comuns sobre acesso, ferramentas académicas, comunicação e relatórios.</p>
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
