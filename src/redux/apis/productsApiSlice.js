import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({baseUrl: 'https://ajio-api.onrender.com/api/product'});
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
        }),
        search: builder.query({
            query: (query) => ({
                url: `?query=${query}`,
                method: "GET"
            })
        })  
    })
    
})

export const {useGetProductsByCategoryQuery, useGetSingleProductQuery, useSearchQuery} = productsApi;