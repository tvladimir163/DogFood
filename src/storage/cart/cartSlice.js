import { createSlice, createSelector } from '@reduxjs/toolkit';
import { calcDiscountPrice } from '../../utils/product'


const initialState = {
   data: []
};

const selectCart = state => state.cart;

export const cartInfoSelector = createSelector(selectCart, (cart) => {
   return cart.data.reduce((total, product) => {
      const priceDiscount = calcDiscountPrice(product.price, product.discount);

      total.totalCount += product.quantity;
      total.amount += product.price * product.quantity;
      total.totalDiscount += (product.price - priceDiscount) * product.quantity;
      total.amountWithDiscount += priceDiscount * product.quantity;

      return total
   }, {
      amountWithDiscount: 0,
      totalDiscount: 0,
      amount: 0,
      totalCount: 0
   })
})

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addCart: (state, action) => {
         const productInCart = state.data.find(product => product._id === action.payload._id);
         if (productInCart) {
            productInCart.quantity++;
         } else {
            state.data.push({ ...action.payload, quantity: 1 });
         }
      },
      addCartAfterChange: (state, action) => {
         const productInCart = state.data.find(product => product._id === action.payload._id);
         if (productInCart && action.payload.quantity > 0) {
            productInCart.quantity = action.payload.quantity;
         } else {
            state.data.push({ ...action.payload, quantity: action.payload.quantity });
         }
      },
      incrementQuantity: (state, action) => {
         const productInCart = state.data.find(product => product._id === action.payload._id);
         if (productInCart) {
            productInCart.quantity++;
         } else {
            state.data.push({ ...action.payload, quantity: 1 });
         }
      },
      decrementQuantity: (state, action) => {
         const productInCart = state.data.find(product => product._id === action.payload._id);
         if (productInCart.quantity <= 1) {
            productInCart.quantity = 1;
         } else {
            productInCart.quantity--;
         }
      },
      removeProduct: (state, action) => {
         state.data = state.data.filter(product => product._id !== action.payload._id)
      }
   }
});

export const { addCart, incrementQuantity, decrementQuantity, removeProduct, addCartAfterChange, } = cartSlice.actions;
export default cartSlice.reducer;
