export const generateErrorInfoProduct = (product) => {
  return `
    One or more properties were completed or invalid
    List of required properties:
    * Title: needs to be a String, received ${typeof product.title}
    * Price: needs to be a Number, received ${typeof product.price}
    * Stock: needs to be a Number, received ${typeof product.stock}
    * Code: needs to be a String, received ${typeof product.code}
    * Category: needs to be a String, received ${typeof product.category}
  `;
};
export const generateErrorID = (id) => {
    return `type of ID recived ${typeof id},   ID expected yuyoID `;
};
