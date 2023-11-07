import Swal from "sweetalert2"

const addtocart = document.getElementById('addtocart')
addtocart.addEventListener('click', (evt) => {
  // Obtener el ID del producto y el carrito del usuario
  const productId = addtocart.getAttribute('data-id')
  const cartId = addtocart.getAttribute('cart_id')
  fetch(`https://apirest.up.railway.app/carts/${cartId}/product/${productId}`, { method: 'POST' })
})
