<script setup lang="ts">
import type { PackagePlan } from '~/types'

const { authError, initialiseAuth, isAuthenticated, ready, register } = useAuth()
const { cartItem, cartInitialised, initialiseCart } = useSchoolCart()
const selectedPlan = computed<PackagePlan | null>(() => cartItem.value)
const submitting = ref(false)
const message = ref('')

const beginRegistration = async () => {
  message.value = ''
  if (!selectedPlan.value) {
    message.value = 'Escolha um pacote e adicione-o ao carrinho antes de criar uma conta.'
    return
  }

  submitting.value = true
  try {
    sessionStorage.setItem('registration-plan', JSON.stringify({
      id: selectedPlan.value.id || selectedPlan.value._id,
      name: selectedPlan.value.name,
    }))
    await register('/subscribe')
  } catch {
    message.value = 'Não foi possível abrir o registo seguro do Keycloak.'
    submitting.value = false
  }
}

onMounted(async () => {
  initialiseCart()
  await initialiseAuth()
  if (isAuthenticated.value && selectedPlan.value) await navigateTo('/subscribe')
})

useSeoMeta({ title: 'Criar conta', robots: 'noindex' })
</script>

<template>
  <section
    class="grid min-h-[calc(100dvh-var(--header-height))] grid-cols-1 overflow-hidden bg-canvas xl:grid-cols-[minmax(0,1.15fr)_minmax(430px,0.85fr)]"
    aria-labelledby="registration-title"
  >
    <div class="relative hidden min-h-80 overflow-hidden bg-navy-800 md:block xl:min-h-full">
      <img
        class="absolute inset-0 size-full object-cover object-center opacity-70"
        src="/images/background-01.webp"
        alt="Uma professora a apoiar alunos em atividades digitais"
        width="1200"
        height="800"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-800/25 to-navy-800/10" aria-hidden="true" />
      <div class="relative z-10 flex h-full min-h-80 items-end px-8 py-8 text-white lg:px-12 xl:min-h-[680px] xl:px-[clamp(3rem,6vw,6rem)] xl:py-[clamp(3rem,7vw,5rem)]">
        <div class="max-w-[36rem]">
          <span class="mb-3 block text-xs font-extrabold tracking-[0.15em] text-brand-200 uppercase">A sua escola, ligada</span>
          <h2 class="mb-3 max-w-[14ch] text-[clamp(2.25rem,4vw,4.5rem)] leading-[1.04] tracking-[-0.045em] text-white">
            Reúna a sua escola num único espaço de trabalho.
          </h2>
          <p class="mb-0 max-w-[52ch] text-sm leading-relaxed text-navy-100 sm:text-base">
            Crie a conta do administrador da escola, confirme o plano e depois convide a sua equipa através do Keycloak.
          </p>
        </div>
      </div>
    </div>

    <div class="flex min-w-0 items-center justify-center py-8 pr-[max(1rem,env(safe-area-inset-right))] pb-[max(2rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] sm:px-6 sm:py-10 lg:px-10 xl:px-[clamp(2.5rem,5vw,5rem)]">
      <div class="w-full min-w-0 max-w-[32rem] rounded-surface border border-line bg-surface-strong p-5 shadow-panel sm:p-7 lg:p-8">
        <div class="mb-6 sm:mb-8">
          <span class="mb-3 block text-xs font-extrabold tracking-[0.14em] text-brand-700 uppercase">Registo da escola</span>
          <h1 id="registration-title" class="mb-2.5 text-[clamp(2rem,8vw,2.75rem)] leading-[1.08] tracking-[-0.035em]">
            Criar conta
          </h1>
          <p v-if="!cartInitialised" class="mb-0 text-sm leading-relaxed text-ink-soft sm:text-base">A preparar o registo da sua escola.</p>
          <p v-else-if="selectedPlan" class="mb-0 text-sm leading-relaxed text-ink-soft sm:text-base">
            Continue com o plano {{ selectedPlan.name }} através do registo seguro.
          </p>
          <p v-else class="mb-0 text-sm leading-relaxed text-ink-soft sm:text-base">Escolha um pacote antes de criar a conta da sua escola.</p>
        </div>

        <div v-if="!cartInitialised" class="grid gap-4" role="status" aria-live="polite">
          <span class="sr-only">A carregar os dados do registo</span>
          <AppSkeleton height="5.25rem" />
          <AppSkeleton height="3.5rem" />
          <AppSkeleton height="3rem" />
        </div>

        <div v-else-if="!selectedPlan" class="flex flex-col items-center rounded-surface border border-line bg-surface-muted px-4 py-8 text-center sm:px-6 sm:py-10">
          <span class="mb-4 grid size-14 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
            <Icon name="ph:shopping-cart-simple" size="30" aria-hidden="true" />
          </span>
          <h3 class="mb-2 text-xl">O seu carrinho está vazio</h3>
          <p class="mb-5 max-w-[38ch] text-sm leading-relaxed text-ink-soft">Compare os pacotes escolares e adicione primeiro um pacote ao carrinho.</p>
          <NuxtLink class="button button--primary w-full sm:w-auto" to="/#plans">Escolher um pacote</NuxtLink>
        </div>

        <div v-else class="grid gap-4">
          <AppAlert v-if="authError || message" type="error" :message="message || authError" />

          <div class="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-surface border border-brand-400 bg-brand-50 p-4 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto]">
            <span class="grid size-10 shrink-0 place-items-center rounded-control bg-brand-700 text-white">
              <Icon name="ph:shopping-cart-simple-fill" size="21" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <small class="block text-xs text-ink-soft">Pacote no carrinho</small>
              <strong class="block break-words text-base">{{ selectedPlan.name }}</strong>
            </div>
            <b class="col-span-2 border-t border-brand-400/45 pt-3 text-left text-lg whitespace-nowrap sm:col-span-1 sm:border-0 sm:pt-0 sm:text-right">
              R{{ Number(selectedPlan.price || 0).toLocaleString('pt-PT') }}<small class="ml-1 text-xs font-semibold text-ink-soft">/mês</small>
            </b>
          </div>

          <p class="mb-0 text-sm leading-relaxed text-ink-soft sm:text-base">
            O Keycloak irá criar a conta inicial do administrador. Os restantes utilizadores devem ser associados ao mesmo identificador de escola.
          </p>
          <button
            class="button button--primary min-h-12 w-full whitespace-normal text-center leading-snug"
            type="button"
            :disabled="!ready || submitting"
            :aria-busy="submitting || !ready"
            @click="beginRegistration"
          >
            <Icon v-if="submitting || !ready" class="shrink-0 animate-spin" name="ph:circle-notch" size="19" aria-hidden="true" />
            {{ submitting ? 'A abrir o registo...' : !ready ? 'A preparar o registo...' : 'Continuar para criar conta' }}
          </button>
        </div>

        <p class="mt-5 mb-0 border-t border-line pt-5 text-center text-sm text-ink-soft">
          Já tem uma conta? <NuxtLink class="text-link" to="/login">Iniciar sessão</NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>
