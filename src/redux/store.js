import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './apis/productsApiSlice';
import  wishList  from './features/wishList'
import { cartApi } from './apis/cartApiSlice';



  const store = configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      'wishList': wishList,
      
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(productsApi.middleware, cartApi.middleware),
    devTools: true,
   
  })

  setupListeners(store.dispatch);
export default store