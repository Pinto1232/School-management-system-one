<script setup lang="ts">
const milestones = [
  { title: 'Um registo fiável', text: 'As informações de alunos, professores, disciplinas, presenças e finanças pertencem ao mesmo contexto escolar.' },
  { title: 'Menos repetição administrativa', text: 'As atualizações comuns passam por fluxos partilhados, sem ser necessário manter várias cópias.' },
  { title: 'Comunicação mais clara com as famílias', text: 'Os encarregados de educação acompanham o progresso, as presenças, as propinas, os comunicados e os próximos eventos.' },
]
const milestoneIcons = ['ph:database', 'ph:arrows-clockwise', 'ph:chats-circle'] as const
const milestoneIcon = (index: number) => milestoneIcons[index] || 'ph:check-circle'

useSeoMeta({
  title: 'Sobre',
  description: 'Saiba por que razão a Lusivo liga a administração, o ensino, a aprendizagem e a comunicação com as famílias.',
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container page-hero__inner">
        <h1>O trabalho escolar merece um sistema claro.</h1>
        <p>Reunimos as operações diárias e as informações de aprendizagem para que todos possam agir com contexto.</p>
      </div>
    </section>

    <section class="section">
      <div class="container story-grid">
        <img src="/images/aboutUs.png" alt="Comunidade escolar a trabalhar em conjunto" width="640" height="520">
        <div>
          <span class="eyebrow">Por que existe</span>
          <h2>Criada para as pessoas que tornam cada dia escolar possível.</h2>
          <p>Os registos administrativos, o trabalho em sala de aula e a comunicação com as famílias encontram-se muitas vezes em ferramentas separadas. A Lusivo volta a ligá-los.</p>
          <p>O resultado é um espaço de trabalho prático que apoia decisões sem obrigar os funcionários a aprender vários sistemas desligados.</p>
        </div>
      </div>
    </section>

    <section class="section plans-section">
      <div class="container">
        <div class="section-heading">
          <h2>Como a plataforma ajuda</h2>
          <p>O produto organiza-se em torno de três resultados importantes para toda a comunidade escolar.</p>
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
