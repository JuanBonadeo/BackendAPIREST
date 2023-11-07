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
      console.log('Envío de correo exitoso para recuperar contraseña')
    }
  })
})
