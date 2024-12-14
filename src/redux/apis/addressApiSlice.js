import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "https://ajio-api.onrender.com/api/address"})

export const addressApi = createApi({
    baseQuery,
    reducerPath: "addressApi",
    endpoints : (builder) => ({
        getAddress : (builder.query) ({
            query : (token) => ({
                url: "",
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }),

            providesTags: ["address"]
        }),



        addAddress : (builder.mutation) ({
            query : ({token, data}) => ({
                url: "",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                
            }),
            invalidatesTags : ["address"]
        })
        

    })
})

 export const {useAddAddressMutation, useGetAddressQuery} = addressApi