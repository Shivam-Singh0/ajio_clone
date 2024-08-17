import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {},
    
}


const CartReducer = createSlice({
    initialState,
    name: "cart",
    
    reducers : {
        addToCart: (state, action) => {
            const {id,title, image, price,} = action.payload
            if (state.cart[id]) {
                state.cart[id].qty += 1
            }
            else{
                state.cart[id] = {id, title, image, price, 'qty' : 1}
            }
            localStorage.setItem("cart", JSON.stringify(state.cart))
            
        },

        updateQuantity: (state, action) => {
            const {id, qty} = action.payload
            state.cart[id].qty = qty
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },

        resetCart: (state) => {
            state.cart = {}
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },

        removeFromCart: (state, action) => {
            delete state.cart[action.payload]
            localStorage.setItem("cart", JSON.stringify(state.cart))
        }
        
    }
})

export const {addToCart, updateQuantity, resetCart, removeFromCart} = CartReducer.actions;

export default CartReducer.reducer