(() => {
  const initialiseAuthForm = () => {
    const feedbackDelayMs = 2000
    const form = document.querySelector('#kc-form-login, #kc-register-form')

    document.documentElement.lang = 'pt'

    if (!(form instanceof HTMLFormElement)) return

    const submitButton = form.querySelector('#kc-login, #kc-register')
    if (!(submitButton instanceof HTMLButtonElement)) return

    let submitting = false

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      if (submitting) return

      submitting = true
      submitButton.disabled = true
      submitButton.setAttribute('aria-busy', 'true')
      submitButton.classList.add('is-loading')

      window.setTimeout(() => {
        form.submit()
      }, feedbackDelayMs)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseAuthForm, { once: true })
  } else {
    initialiseAuthForm()
  }
})()
