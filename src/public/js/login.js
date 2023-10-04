const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => obj[key] = value)
  fetch('https://apirest.up.railway.app/sessions/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => {
    if (result.status === 200) {
      window.location.replace('https://apirest.up.railway.app/views/products')
    }
  })
})
