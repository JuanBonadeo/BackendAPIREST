const form = document.getElementById('restartPasswordForm')

form.addEventListener('submit', async e => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => obj[key] = value)
  await fetch('/sessions/resetPassword', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => {
    if (result.status === 200) {
      console.log('Contraseña restaurada')
    }
  })
})
