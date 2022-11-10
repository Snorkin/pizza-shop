import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    items: {count: '', rows: []},
    status: 'loading',
    selectedPizza: {},
    popup: false
}

export const getPizzas = createAsyncThunk(
    'pizza/getPizzas',
    async (props) => {
        const {data} = await axios.get(`http://localhost:5000/api/pizza/check?category=${props.selectedCategory}&orderBy=${props.selectedSort}${props.search}&page=${props.currentPage}&limit=${props.limit}`)
        return data
    }
)

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setSelectedPizza(state, action){
            state.selectedPizza = action.payload
        },
        changePopupState(state){
            state.popup = !state.popup
            console.log(state.popup)
        }
    },
    extraReducers: {
        [getPizzas.pending] : (state, action) => {
            //console.log('Отправка запросса на BackEnd')
            state.status = 'loading'
            
        },
        [getPizzas.fulfilled]: (state, action) => {
            //console.log('Запрос выполнен')
            state.items = action.payload
            state.status = 'success'
        },
        [getPizzas.rejected]: (state, action) => {
            //console.log('Запрос невыполнен')
            state.status = 'error'
        }
    }
})
export const { setSelectedPizza, changePopupState } = pizzasSlice.actions
export default pizzasSlice.reducer;