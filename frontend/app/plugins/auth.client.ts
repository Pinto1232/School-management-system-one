export default defineNuxtPlugin(() => {
  const { initialiseAuth } = useAuth()
  void initialiseAuth()
})
