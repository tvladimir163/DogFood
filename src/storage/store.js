import { configureStore } from "@reduxjs/toolkit";
import api from "../utils/api";
import productsReducer from './products/productsSlice';
import userReducer from './user/userSlice';
import singleProductReducer from './singleProduct/singleProductSlice';
import cartReducer from './cart/cartSlice';
import storage from 'redux-persist/lib/storage'
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';

const persistConfig = {
   key: 'root',
   storage,
}

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
   reducer: {
      cart: persistedCartReducer,
      products: productsReducer,
      user: userReducer,
      singleProduct: singleProductReducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         thunk: {
            extraArgument: api,
         },
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      })
})


export const persistor = persistStore(store);
export default store;