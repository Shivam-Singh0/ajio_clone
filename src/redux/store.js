import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './apis/productsApiSlice';
import  wishList  from './features/wishList'
import cart from './features/Cart'



  const store = configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      'wishList': wishList,
      'cart': cart
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(productsApi.middleware),
    devTools: true,
   
  })

  setupListeners(store.dispatch);
export default store