import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({baseUrl: 'https://fakestoreapi.com/products'});
export const productsApi = createApi({
    baseQuery,
    reducerPath: 'productsApi',
    endpoints: (builder) => ({
        getProductsByCategory: builder.query({
            query: (category) => ({
                url: `/category/${category}`,
                method: "GET"
            })
        }),
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET"
            })
        })  
    })
})

export const {useGetProductsByCategoryQuery, useGetSingleProductQuery} = productsApi;