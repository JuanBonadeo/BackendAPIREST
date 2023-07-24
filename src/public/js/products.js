async function addProductToCart(id) {
    try {
        await fetch(
        `http://localhost:8080/carts/64a440ae1fce0507a8ec60bf/product/${id}`, // carrito hardcodeado por ahora
        {
            method: "POST",
        }
        );   
    } catch (e) {
        console.log("error", e);
    }
}
