const addtocart = document.getElementById('addtocart')
addtocart.addEventListener('click', (evt) => {
  const productId = addtocart.getAttribute('data-id')
  const cartId = addtocart.getAttribute('cart_id')
  result = fetch(`https://apirest.up.railway.app/carts/${cartId}/product/${productId}`, { method: 'POST' })
      if(result.status === 403) {
         return Swal.fire({
          title: 'Error!',
          text: 'You cant add your own product',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
      return Swal.fire({
        title: 'Product added to cart!',
        text: 'Do you want to go to your cart or continue shopping?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Go to cart',
        cancelButtonText: 'Continue shopping'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/views/carts/' + cartId
        }
      })
    
})



