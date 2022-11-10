import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            const findItem = state.items.find(item => item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size)

            if(findItem){findItem.count++} else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return item.price * item.count + sum}, 0)
        },

        removeItem(state, action){
            const findItem = state.items.find(item => item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size)
            console.log(action.count)
            if(findItem && action.payload.count === 0){
                console.log('suka')
                 state.items = state.items.filter(item => !(item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size)) ;
            }
            
            if(findItem && findItem.count > 1){findItem.count--}
            
            state.totalPrice = state.items.reduce((sum, item) => {
                return item.price * item.count + sum}, 0)
            
        },

        clearItems(state, action){
            state.items = [];
            state.totalPrice = 0;
        }
    }
})
export const { addItem, removeItem, clearItems} = cartSlice.actions
export default cartSlice.reducer;