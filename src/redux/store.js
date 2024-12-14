import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './apis/productsApiSlice';
import { cartApi } from './apis/cartApiSlice';
import { wishlistApi } from './apis/wishlistApiSlice';
import { addressApi } from './apis/addressApiSlice';



  const store = configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      [wishlistApi.reducerPath]: wishlistApi.reducer,
      [addressApi.reducerPath] : addressApi.reducer
      
      
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(productsApi.middleware, cartApi.middleware, wishlistApi.middleware, addressApi.middleware),
    devTools: true,
   
  })

  setupListeners(store.dispatch);
export default store