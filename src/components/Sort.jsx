import React from 'react';
import {useSelector, useDispatch} from 'react-redux'

import {setSelectedSort, reverseSort} from '../redux/slices/FilterSlice'

function Sort(){
  const sort = [{name: 'Популярности', value: 'rating'}, {name: 'Цене', value: 'price'}, {name: 'Алфавиту', value: 'title'}]
  const [active, changeActive] = React.useState(false);
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filterSlice)
  const sortRef = React.useRef();

  const changeSelectedSort = (value) => {
    dispatch(setSelectedSort(value))
  }

  const reverseSelectedSort = (value) => {
    dispatch(reverseSort(value))
  }

  React.useEffect(() => {
    const clickOutside = (event) => {
      if(!event.composedPath().includes(sortRef.current)){
        changeActive(false)
      }
    }
    document.body.addEventListener('click', clickOutside)

    return () => {
      document.body.removeEventListener('click', clickOutside)
    }
  }, [])

    return <div ref={sortRef} className="sort" onClick={() => changeActive(!active)}>
    <div className="sort__label">
      <b>Сортировка по:</b>
      <span>{filter.sortDesc === true? filter.selectedSort.name + '↓' : filter.selectedSort.name + '↑'}</span>
    </div>
    {active && (
       <div className="sort__popup">
       <ul>{
          sort.map((value, id) => {
            return <li key={id} onClick = {() => {
              filter.selectedSort.name === value.name? reverseSelectedSort(!filter.sortDesc) : reverseSelectedSort(true)
              changeSelectedSort(value)
              //console.log(filter.sortDesc)
            }} className = {filter.selectedSort.value === value.value ? 'active': ''}>{value.name}</li>
           })
        }
       </ul>
     </div>
    )
    }
   
  </div>
  }
export default Sort  
