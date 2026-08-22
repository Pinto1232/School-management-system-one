import type { PackagePlan } from '~/types'

const CART_STORAGE_KEY = 'school-cart'

export const useSchoolCart = () => {
  const cartItem = useState<PackagePlan | null>('school-cart-item', () => null)
  const cartInitialised = useState<boolean>('school-cart-initialised', () => false)

  const initialiseCart = () => {
    if (!import.meta.client || cartInitialised.value) return

    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      cartItem.value = savedCart ? localisePackagePlan(JSON.parse(savedCart) as PackagePlan) : null
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY)
      cartItem.value = null
    } finally {
      cartInitialised.value = true
    }
  }

  const addToCart = (plan: PackagePlan) => {
    const localisedPlan = localisePackagePlan(plan)
    cartItem.value = localisedPlan
    if (import.meta.client) localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(localisedPlan))
  }

  const clearCart = () => {
    cartItem.value = null
    if (import.meta.client) localStorage.removeItem(CART_STORAGE_KEY)
  }

  return {
    cartItem,
    cartInitialised,
    hasCartItem: computed(() => Boolean(cartItem.value)),
    initialiseCart,
    addToCart,
    clearCart,
  }
}
