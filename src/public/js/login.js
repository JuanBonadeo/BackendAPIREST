const form = document.getElementById('loginForm')

form.addEventListener('submit', async e => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => obj[key] = value)
  try {
    const result = await fetch('https://apirest.up.railway.app/sessions/login', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (result.status === 200) {
      window.location.replace('https://apirest.up.railway.app/views/products')
      form.reset() // reset the form fields
    } 
    if (result.status === 400) {
      Swal.fire({
        title: 'Error!',
        text: 'Wrong email or password',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
    }
  } catch (error) {
    console.error(error)
  }
})
