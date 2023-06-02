document.addEventListener('DOMContentLoaded', function () {
  const emailObj = {
    email: '',
    subject: '',
    message: ''
  }

  const form = document.querySelector('#formulario')
  const inputEmail = document.querySelector('#email')
  const inputSubject = document.querySelector('#subject')
  const inputMessage = document.querySelector('#message')
  const submitButton = document.querySelector('#sendEmail')
  const resetButton = document.querySelector('#formulario button[type="reset"]')
  const spinner = document.querySelector('#spinner')

  inputEmail.addEventListener('input', validate)
  inputSubject.addEventListener('input', validate)
  inputMessage.addEventListener('input', validate)

  form.addEventListener('submit', sendEmail)

  resetButton.addEventListener('click', function (e) {
    e.preventDefault()

    resetEmailFields()
    form.reset()
    checkDataEmail()
  })

  function validate(e) {
    if (e.target.value.trim() === '') {
      showError(`The field ${e.target.id} is mandatory!`, e.target.parentElement)
      emailObj[e.target.name] = ''
      checkDataEmail()
      return
    }

    if (e.target.id === 'email' && !emailValidation(e.target.value)) {
      showError('The email is invalid', e.target.parentElement)
      emailObj[e.target.name] = ''
      checkDataEmail()
      return
    }

    emailObj[e.target.name] = e.target.value.trim().toLowerCase()
    checkDataEmail()
  }

  function emailValidation(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    return regex.test(email)
  }

  function checkDataEmail() {
    console.log(emailObj)
    if (Object.values(emailObj).includes('')) {
      submitButton.classList.add('opacity-50')
      submitButton.disabled = true
      return
    }

    submitButton.classList.remove('opacity-50')
    submitButton.disabled = false
  }

  function showError(msg, reference) {
    const alert = reference.querySelector('.bg-red-600')
    if (alert) {
      alert.remove()
    }

    const error = document.createElement('p')
    error.textContent = msg
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

    reference.appendChild(error)

    setTimeout(() => {
      reference.removeChild(error)
    }, 2000)
  }

  function sendEmail(e) {
    e.preventDefault()

    spinner.classList.remove('hidden')
    spinner.classList.add('flex')

    const successfulAlert = document.createElement('p')
    successfulAlert.classList.add(
      'bg-green-500',
      'text-white',
      'p-2',
      'text-center',
      'rounded-lg',
      'mt-10',
      'font-bold',
      'text-sm',
      'uppercase'
    )
    successfulAlert.textContent = 'Message was sent successfully'

    setTimeout(() => {
      spinner.classList.remove('flex')
      spinner.classList.add('hidden')

      resetEmailFields()
      form.reset()
      checkDataEmail()

      form.appendChild(successfulAlert)
      setTimeout(() => {
        successfulAlert.remove()
      }, 2500)
    }, 3000)
  }

  function resetEmailFields() {
    emailObj.email = ''
    emailObj.subject = ''
    emailObj.message = ''
  }
})
