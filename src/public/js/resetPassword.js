
const form = document.getElementById('restartPasswordForm')

form.addEventListener('submit', async e => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => obj[key] = value)
  await fetch('https://apirest.up.railway.app/sessions/resetPassword', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => {
    if (result.status === 200) {
      Swal.fire({
        title: 'Password updated!',
        text: 'You can now login with your new password',
        icon: 'success',
        confirmButtonText: 'Go to login'
      }).then(() => {
        window.location.replace('https://apirest.up.railway.app/views/login')
      })
    }
    if (result.status === 400) {
      Swal.fire({
        title: 'Error!',
        text: 'You cant use your last password',
        icon: 'error',
        confirmButtonText: 'Try again, with another'
      })
    }
  })
})
