import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({baseUrl: 'https://ajio-api.onrender.com/api/wishlist'});

export const wishlistApi = createApi({
    baseQuery,
    reducerPath : "wishlistApi",

    endpoints : (builder) => ({
        getWishlist : builder.query({
            query: (token) => ({
              url: "",
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
             
            }),
            providesTags: ['wishlist']
          }),
          addToWishlist : builder.mutation({
            query: ({token, data}) => ({
              url : "",
              method: "POST",
              body: data,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
            invalidatesTags : ["wishlist"]
          }),

          removeFromWishlist : builder.mutation({
            query : ({token, productId}) => ({
              url : "",
              method:"DELETE",
              headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
              },
              body: {productId}
            }),
            invalidatesTags : ["wishlist"]
          }),

          isWishListed : builder.mutation({
            query : ({token, productId}) => ({
              url : "/is-wishlisted",
              method : "POST",
              body: {productId},
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
          })
    })
});
export const {useGetWishlistQuery, useAddToWishlistMutation, useIsWishListedMutation, useRemoveFromWishlistMutation} = wishlistApi
