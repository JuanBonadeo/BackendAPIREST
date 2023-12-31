

const form = document.getElementById('registerForm')

form.addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => obj[key] = value)
  fetch('https://apirest.up.railway.app/sessions/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => {
    if (result.status === 200) {
      Swal.fire({
        title: 'You are registered!',
        text: 'You can now log in!',
        icon: 'success',
        confirmButtonText: 'Go to login'
      }).then(() => {
        window.location.href = '/views/login'
      })
    }
  })
})

