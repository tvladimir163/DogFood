export const isLiked = (likes, userId) => likes.some(id => id === userId);

export const calcDiscountPrice = (price, discount) => {
   return Math.round(price - price * discount / 100);
}

export const createMarkup = (textToHtml) => {
   return { __html: textToHtml }
}


export const checkProductInCart = (cartProducts, _id) => {
   const productInCart = cartProducts.find(
      (item) => item._id === _id
   )
   if (productInCart?.quantity) {
      return { quantity: productInCart.quantity, exist: true }
   }
   return { quantity: 0, exist: false };
}