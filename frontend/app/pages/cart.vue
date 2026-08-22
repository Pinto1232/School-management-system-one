<script setup lang="ts">
const { cartItem, cartInitialised, initialiseCart, clearCart } = useSchoolCart()

const features = computed(() => {
  if (!cartItem.value) return []
  if (Array.isArray(cartItem.value.features)) return cartItem.value.features
  const source = cartItem.value.features && typeof cartItem.value.features === 'object'
    ? cartItem.value.features
    : cartItem.value

  return Object.entries(source)
    .filter(([key, value]) => value === true && !['_id', 'id', 'name', 'price', '__v'].includes(key))
    .map(([key]) => translateFeatureLabel(key))
})

const fallbackImage = computed(() => ['complete', 'completo'].includes(cartItem.value?.name.toLowerCase() || '')
  ? '/images/plan-complete.webp'
  : '/images/plan-essential.webp')

const planImage = computed(() => {
  const plan = cartItem.value
  if (!plan) return fallbackImage.value
  if (typeof plan.image === 'string' && plan.image.trim()) return plan.image
  const remoteImage = plan.images?.find(image => typeof image?.url === 'string' && image.url.trim())
  return remoteImage?.url || fallbackImage.value
})

const formattedPrice = computed(() => Number(cartItem.value?.price || 0).toLocaleString('pt-PT'))

const useFallbackImage = (event: Event) => {
  const image = event.currentTarget as HTMLImageElement
  if (!image.src.endsWith(fallbackImage.value)) image.src = fallbackImage.value
}

onMounted(initialiseCart)

useSeoMeta({
  title: 'Carrinho',
  description: 'Reveja o pacote escolar Lusivo selecionado antes de continuar para a criação da conta.',
  robots: 'noindex',
})
</script>

<template>
  <section class="cart-page">
    <div class="container cart-page__container">
      <header class="cart-page__header">
        <NuxtLink class="cart-page__back" to="/#plans">
          <Icon name="ph:arrow-left" size="18" aria-hidden="true" />
          Voltar aos pacotes
        </NuxtLink>
        <span>Compra</span>
        <h1>Reveja o seu carrinho</h1>
        <p>Confirme o pacote adequado à sua escola antes de criar a conta.</p>
      </header>

      <div v-if="!cartInitialised" class="cart-layout" aria-label="A carregar o carrinho" aria-busy="true">
        <AppSkeleton height="480px" />
        <AppSkeleton height="360px" />
      </div>

      <div v-else-if="!cartItem" class="cart-empty">
        <span>
          <Icon name="ph:shopping-cart-simple" size="34" aria-hidden="true" />
        </span>
        <h2>O seu carrinho está vazio</h2>
        <p>Escolha um pacote escolar e adicione-o ao carrinho antes de continuar.</p>
        <NuxtLink class="button button--primary" to="/#plans">
          Escolher um pacote
          <Icon name="ph:arrow-right" size="19" aria-hidden="true" />
        </NuxtLink>
      </div>

      <div v-else class="cart-layout">
        <article class="cart-product">
          <div class="cart-product__media">
            <img
              :src="planImage"
              :alt="`Pacote escolar ${cartItem.name}`"
              width="1402"
              height="1254"
              decoding="async"
              @error="useFallbackImage"
            >
          </div>

          <div class="cart-product__body">
            <div class="cart-product__heading">
              <div>
                <span>Pacote selecionado</span>
                <h2>{{ cartItem.name }}</h2>
              </div>
              <div class="cart-product__price">
                <strong>R{{ formattedPrice }}</strong>
                <small>por mês</small>
              </div>
            </div>

            <p class="cart-product__description">
              {{ cartItem.description || 'Ferramentas flexíveis para a sua comunidade escolar.' }}
            </p>

            <section class="cart-product__features" aria-labelledby="cart-features-title">
              <h3 id="cart-features-title">Incluído neste pacote</h3>
              <ul>
                <li v-for="feature in features" :key="feature">
                  <Icon name="ph:check-circle-fill" size="20" aria-hidden="true" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </section>

            <div class="cart-product__actions">
              <NuxtLink class="button button--secondary" to="/#plans">
                Alterar pacote
              </NuxtLink>
              <button class="button button--ghost" type="button" @click="clearCart">
                <Icon name="ph:trash" size="18" aria-hidden="true" />
                Remover
              </button>
            </div>
          </div>
        </article>

        <aside class="cart-summary" aria-labelledby="cart-summary-title" aria-label="Resumo da compra">
          <div class="cart-summary__heading">
            <span class="cart-summary__icon">
              <Icon name="ph:receipt" size="22" aria-hidden="true" />
            </span>
            <div>
              <h2 id="cart-summary-title">Resumo da compra</h2>
              <p>Um pacote no seu carrinho</p>
            </div>
          </div>

          <dl class="cart-summary__details">
            <div>
              <dt>Pacote</dt>
              <dd>{{ cartItem.name }}</dd>
            </div>
            <div>
              <dt>Faturação</dt>
              <dd>Mensal</dd>
            </div>
          </dl>

          <div class="cart-summary__total">
            <span>Total de hoje</span>
            <strong>R{{ formattedPrice }}</strong>
            <small>Os dados de pagamento são adicionados depois da criação da conta.</small>
          </div>

          <NuxtLink class="button button--primary cart-summary__continue" to="/register">
            Continuar para criar a conta
            <Icon name="ph:arrow-right" size="19" aria-hidden="true" />
          </NuxtLink>

          <p class="cart-summary__assurance">
            <Icon name="ph:shield-check" size="19" aria-hidden="true" />
            Nenhum pagamento é processado nesta página.
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>
