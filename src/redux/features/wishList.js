import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishList: localStorage.getItem("wishList") ? JSON.parse(localStorage.getItem("wishList")) : [],
    loading: true,
    wishListed: false,
    
}

const wishListSlice = createSlice({
    initialState,
    name: "wishList",
    
    reducers : {

        addToWishList: (state, action) => {
            state.adding = true;
            state.wishList.push(action.payload);
            localStorage.setItem("wishList", JSON.stringify(state.wishList))
            state.adding = false;
        },

        inWishList: (state, action) => {
           
            state.wishListed = state.wishList[action.payload - 1] ? true : false;
            state.loading = false;
            
        },

        removeFromWishList: (state, action) => {
            state.removing = true;
            state.wishList.splice(action.payload-1, 1);
            localStorage.setItem("wishList", JSON.stringify(state.wishList))
            state.removing = false;
        },
        resetWishList: (state) => {
            state.wishList = []
            localStorage.removeItem("wishList")
        }
    }
})

export const {addToWishList, inWishList, resetWishList, removeFromWishList} = wishListSlice.actions;

export default wishListSlice.reducer