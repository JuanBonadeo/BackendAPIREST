const form = document.getElementById('requestResetPasswordForm')

form.addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => obj[key] = value)
  fetch('https://apirest.up.railway.app/sessions/requestResetPassword', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => {
    if (result.status === 200) {
      Swal.fire({
        title: 'Email sent!',
        text: 'Check your inbox!',
        icon: 'success',
        confirmButtonText: 'Go to Gmail'
      }).then(() => {
        window.location.href = 'https://mail.google.com/'
      })
    }
    if(result.status === 500){
      Swal.fire({
        title: 'Error!',
        text: 'Email not found!',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
    }
  })
})
