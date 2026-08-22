<script setup lang="ts">
import type { PackagePlan, User } from '~/types'

const { request } = useApi()
const { cartItem, cartInitialised, initialiseCart } = useSchoolCart()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  packageName: '',
  profileImage: null as File | null,
})
const errors = reactive<Record<string, string | undefined>>({})
const submitting = ref(false)
const message = ref('')
const selectedPlan = computed<PackagePlan | null>(() => cartItem.value)

const validate = () => {
  errors.firstName = /^[A-Za-zÀ-ž' -]+$/.test(form.firstName.trim()) ? undefined : 'Introduza um nome válido.'
  errors.lastName = /^[A-Za-zÀ-ž' -]+$/.test(form.lastName.trim()) ? undefined : 'Introduza um apelido válido.'
  errors.email = /^\S+@\S+\.\S+$/.test(form.email) ? undefined : 'Introduza um endereço de e-mail válido.'
  errors.password = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(form.password)
    ? undefined
    : 'Utilize pelo menos 6 caracteres, incluindo uma letra e um número.'
  errors.profileImage = form.profileImage ? undefined : 'Escolha uma imagem de perfil.'
  errors.packageName = form.packageName.trim() ? undefined : 'Escolha ou introduza o nome de um pacote.'
  return !Object.values(errors).some(Boolean)
}

const handleFile = (event: Event) => {
  const input = event.target as HTMLInputElement
  form.profileImage = input.files?.[0] || null
  errors.profileImage = form.profileImage ? undefined : 'Escolha uma imagem de perfil.'
}

const submit = async () => {
  message.value = ''
  if (!selectedPlan.value) {
    message.value = 'Escolha um pacote e adicione-o ao carrinho antes de criar uma conta.'
    return
  }
  if (!validate()) return
  submitting.value = true

  const body = new FormData()
  body.append('firstName', form.firstName.trim())
  body.append('lastName', form.lastName.trim())
  body.append('email', form.email.trim())
  body.append('password', form.password)
  body.append('packageName', form.packageName.trim())
  if (form.profileImage) body.append('profileImage', form.profileImage)

  try {
    const response = await request<{ message: string; user: User }>('/users/register', {
      method: 'POST',
      body,
    })
    if (import.meta.client) {
      sessionStorage.setItem('registration', JSON.stringify({
        user: response.user,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      }))
    }
    await navigateTo('/subscribe')
  } catch (error) {
    message.value = getApiErrorMessage(error, 'Não foi possível criar a conta. Reveja os dados e tente novamente.')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  initialiseCart()
  form.packageName = selectedPlan.value?.name || ''
})

watch(selectedPlan, plan => {
  form.packageName = plan?.name || ''
})

useSeoMeta({ title: 'Criar conta', robots: 'noindex' })
</script>

<template>
  <section class="auth-shell">
    <div class="auth-shell__visual">
      <img src="/images/background-01.webp" alt="Uma professora a apoiar alunos em atividades digitais" width="1200" height="900">
      <div class="auth-shell__visual-copy">
        <h1>Reúna a sua escola num único espaço de trabalho.</h1>
        <p>Crie uma conta, confirme o plano e ligue as pessoas e os registos que fazem parte de cada dia escolar.</p>
      </div>
    </div>
    <div class="auth-shell__form">
      <div class="auth-card">
        <div class="auth-card__header">
          <h2>Criar conta</h2>
          <p v-if="selectedPlan">Continue com o plano {{ selectedPlan.name }}.</p>
          <p v-else>Escolha um pacote antes de criar a conta da sua escola.</p>
        </div>

        <AppSkeleton v-if="!cartInitialised" height="360px" />

        <div v-else-if="!selectedPlan" class="registration-plan-required">
          <span>
            <Icon name="ph:shopping-cart-simple" size="30" aria-hidden="true" />
          </span>
          <h3>O seu carrinho está vazio</h3>
          <p>Compare os pacotes escolares, reveja as funcionalidades e adicione primeiro um pacote ao carrinho.</p>
          <NuxtLink class="button button--primary" to="/#plans">
            Escolher um pacote
            <Icon name="ph:arrow-right" size="19" aria-hidden="true" />
          </NuxtLink>
        </div>

        <form v-else class="form-stack" novalidate @submit.prevent="submit">
          <AppAlert v-if="message" type="error" :message="message" />

          <div class="registration-plan-summary">
            <span>
              <Icon name="ph:shopping-cart-simple-fill" size="21" aria-hidden="true" />
            </span>
            <div>
              <small>Pacote no carrinho</small>
              <strong>{{ selectedPlan.name }}</strong>
            </div>
            <b>R{{ Number(selectedPlan.price || 0).toLocaleString('pt-PT') }}<small>/mês</small></b>
          </div>

          <div class="form-grid">
            <div class="field">
              <label for="first-name">Nome</label>
              <input id="first-name" v-model="form.firstName" type="text" autocomplete="given-name" placeholder="O seu nome" :aria-invalid="Boolean(errors.firstName)">
              <p v-if="errors.firstName" class="field__error">{{ errors.firstName }}</p>
            </div>
            <div class="field">
              <label for="last-name">Apelido</label>
              <input id="last-name" v-model="form.lastName" type="text" autocomplete="family-name" placeholder="O seu apelido" :aria-invalid="Boolean(errors.lastName)">
              <p v-if="errors.lastName" class="field__error">{{ errors.lastName }}</p>
            </div>
          </div>

          <div class="field">
            <label for="register-email">Endereço de e-mail</label>
            <input id="register-email" v-model.trim="form.email" type="email" autocomplete="email" placeholder="nome@escola.co.za" :aria-invalid="Boolean(errors.email)">
            <p v-if="errors.email" class="field__error">{{ errors.email }}</p>
          </div>

          <div class="field">
            <label for="register-password">Palavra-passe</label>
            <input id="register-password" v-model="form.password" type="password" autocomplete="new-password" placeholder="Crie uma palavra-passe" :aria-invalid="Boolean(errors.password)">
            <p v-if="errors.password" class="field__error">{{ errors.password }}</p>
            <p v-else class="field__helper">Pelo menos 6 caracteres, incluindo um número.</p>
          </div>

          <div class="field">
            <label for="profile-image">Imagem de perfil</label>
            <input id="profile-image" type="file" accept="image/png,image/jpeg,image/webp" :aria-invalid="Boolean(errors.profileImage)" @change="handleFile">
            <p v-if="errors.profileImage" class="field__error">{{ errors.profileImage }}</p>
            <p v-else class="field__helper">PNG, JPG ou WebP.</p>
          </div>

          <button class="button button--primary" type="submit" :disabled="submitting" style="width: 100%">
            <Icon v-if="submitting" name="ph:circle-notch" size="19" aria-hidden="true" />
            {{ submitting ? 'A criar conta...' : 'Criar conta' }}
          </button>
        </form>

        <p class="auth-card__footer">Já tem uma conta? <NuxtLink class="text-link" to="/login">Iniciar sessão</NuxtLink></p>
      </div>
    </div>
  </section>
</template>
