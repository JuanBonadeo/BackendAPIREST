const socket = io();

let addProductBtn = document.getElementById("add-product-btn")

// Socket.on


socket.on("update-products", (products) => {
  let productsContainer = document.getElementById("products-container")
  productsContainer.innerHTML = ""

  for (let product of products) {
    let productElement = document.createElement("div");
    productElement.innerHTML = `
      <p> Title: ${product.title} </p>
      <p> Description: ${product.description} </p>
      <p> Price: ${product.price} </p>
      <p> Stock: ${product.stock} </p>
      <button id=${product.id} onclick="deleteProduct(this)"> Borrar </button>
    `

    productElement.setAttribute("style", "border: 1px solid #000; border-radius: 1rem; padding: 1rem; margin-bottom: 1rem")
    productsContainer.appendChild(productElement)
  }

})

// Event listeners

addProductBtn.addEventListener("click", (e) => {
  e.preventDefault()

  // Obtenemos los inputs

  let titleInput = document.getElementById("title")
  let descriptionInput = document.getElementById("description")
  let priceInput = document.getElementById("price")
  let codeInput = document.getElementById("code")
  let stockInput = document.getElementById("stock")
  let categoryInput = document.getElementById("category")
  let statusInput = document.getElementById("status")

  // Creamos la "data" del producto a partir de los valores de los inputs, y la enviamos

  let productData = {
    title: titleInput.value,
    description: descriptionInput.value,
    price: Number(priceInput.value),
    code: Number(codeInput.value),
    stock: Number(stockInput.value),
    category: categoryInput.value,
    status: (statusInput.value.toLowerCase() === "true")
  }

  socket.emit("add-product", productData)

  // "Limpiamos" los inputs

  titleInput.value = ""
  descriptionInput.value = ""
  priceInput.value = ""
  codeInput.value = ""
  stockInput.value = ""
  categoryInput.value = ""
  statusInput.value = ""

})

// Declaracion de funciones auxiliares

function deleteProduct(button) {
  socket.emit("delete-product", button.id) // El id del boton es del producto
}