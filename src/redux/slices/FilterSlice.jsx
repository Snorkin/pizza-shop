import { createSlice } from "@reduxjs/toolkit"
import qs from 'qs'
const initialState = {
    selectedCategory: {name: 'Пицца', value: 'pizza'},
    selectedSort: {name: 'Популярности', value: 'rating'},
    sortDesc: true,
    searchValue: '',
    currentPage: 1
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSelectedCategory(state, action){
            state.selectedCategory = action.payload
            // console.log('state', state)
            // console.log('action', action)
        },

        setSelectedSort(state, action){
            // console.log('state', state)
            // console.log('action', action)
            state.selectedSort = action.payload
        },

        setSearchValue(state, action){
            state.searchValue = action.payload
        },

        reverseSort(state, action){
            //console.log('reverse', state.sortDesc)
            state.sortDesc = action.payload
        }, 

        changeCurrentPage(state, action){
            state.currentPage = action.payload
            //console.log(state.currentPage)
        },

        setFilters(state){
             const urlProps = qs.parse(window.location.search.substring(1));
             state.selectedCategory.value = urlProps.selectedCategory
             state.currentPage = Math.ceil(urlProps.currentPage)
             state.selectedSort.value = urlProps.selectedSort.includes('Desc') ? urlProps.selectedSort.replace('Desc', '') : urlProps.selectedSort.replace('Asc', '')
             state.sortDesc = urlProps.selectedSort.includes('Desc') ? true : false
             switch(state.selectedSort.value){
                case('rating'): state.selectedSort.name = 'Популярности'; break
                case('price'): state.selectedSort.name = 'Цене'; break
                case('title'): state.selectedSort.name = 'Алфавиту'; break
                default: state.selectedSort.name = 'Популярности';
             }
            console.log(state.currentPage)
        }
    }
})
export const { setSelectedCategory, setSelectedSort, reverseSort, setSearchValue, changeCurrentPage, setFilters} = filterSlice.actions
export default filterSlice.reducer;