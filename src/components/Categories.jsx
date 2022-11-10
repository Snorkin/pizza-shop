import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setSelectedCategory} from '../redux/slices/FilterSlice'

function Categories(){
  const categories = [{name: 'Пицца', value: 'pizza'}, {name: 'Комбо', value: 'combo'}, {name: 'Закуски', value: 'snacks'}, {name: 'Десерты', value: 'deserts'}, {name: 'Напитки', value: 'drinks'}, {name: 'Акции', value: 'sells'}];
  const selectedCategory = useSelector((state) => state.filterSlice.selectedCategory)
  const dispatch = useDispatch()

  const changeSelectedCategory = (value) => {
    //console.log('change cat', value)
    dispatch(setSelectedCategory(value))
  }
  
    return <div className = "categories">
              <ul>
                {categories.map((value, id) => {
                  return <li key={id} onClick = {() => {changeSelectedCategory(value)}} className = {selectedCategory.value === value.value ? 'active': ''}>{value.name}</li>
                })
                
                }
              </ul>
            </div>
  }

  export default Categories