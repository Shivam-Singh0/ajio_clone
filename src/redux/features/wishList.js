import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishList: localStorage.getItem("wishList") ? JSON.parse(localStorage.getItem("wishList")) : [],
    
  
    
}

const wishListSlice = createSlice({
    initialState,
    name: "wishList",
    
    reducers : {

        addToWishList: (state, action) => {
            
            state.wishList.push(action.payload);
            localStorage.setItem("wishList", JSON.stringify(state.wishList))
            
        },


        removeFromWishList: (state, action) => {
           
            let index = state.wishList.indexOf(action.payload);
            state.wishList.splice(index, 1);
            localStorage.setItem("wishList", JSON.stringify(state.wishList))
           
           
        },
        resetWishList: (state) => {
            state.wishList = []
            localStorage.removeItem("wishList")
        }
    }
})

export const {addToWishList,  resetWishList, removeFromWishList} = wishListSlice.actions;

export default wishListSlice.reducer
