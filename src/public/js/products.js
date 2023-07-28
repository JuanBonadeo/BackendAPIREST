

let addtocart = document.getElementById("addtocart")
  addtocart.addEventListener("click", (evt) => {
    // Obtener el ID del producto y el carrito del usuario
    console.log("sape")
    let productId = addtocart.getAttribute("data-id");
    let cartId = addtocart.getAttribute("cart_id");
    fetch(`http://localhost:8080/carts/${cartId}/product/${productId}`,{method:'POST'})
    
  });



