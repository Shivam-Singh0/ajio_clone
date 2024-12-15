import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://ajio-api.onrender.com/api/cart",
});



export const cartApi = createApi({
  baseQuery,
  reducerPath: "cartApi",
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ token, data }) => ({
        url: "/addToCart",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getCart : builder.query({
      query: (token) => ({
        url: "",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       
      }),
      providesTags: ['Cart'], // Provides cache tags for Cart
    }),
    updateQuantity: builder.mutation({
      query: ({ token, productId, quantity }) => ({
        url: "/update-quantity",
        method: "POST",
        body: {productId, quantity},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    removeFromCart: builder.mutation({
      query : ({token, productId}) => ({
        url : "/remove",
        method : "DELETE",
        body : {productId},
        headers : {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`
        },
        
      }),
      invalidatesTags: ['Cart'], // Invalidate cache for Cart
    }),
    createOrder : builder.mutation({
      query : ({token, products}) => ({
        url: "/order",
        method: "POST",
        body: {products},
        headers: {
          "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
      })
    }),

    getOrders: builder.query({
      query: (token) => ({
        url: "/order",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    })
    
  }),

  
});

export const {useAddToCartMutation, useGetCartQuery, useUpdateQuantityMutation, useRemoveFromCartMutation, useCreateOrderMutation, useGetOrdersQuery} = cartApi