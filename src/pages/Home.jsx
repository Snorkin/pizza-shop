import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

// import qs from 'qs'
// import {useNavigate} from 'react-router-dom'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Pizza_skeleton/Skeleton'
import Pagination from '../components/Pagination'
import PizzaModal from '../components/PizzaModal'
import {getPizzas} from '../redux/slices/PizzasSlice'
// import {setFilters} from '../redux/slices/Filter'

const Home = () => {

    //const [items, setItems] = React.useState({count: '', rows: []})
    const [isLoading, changeIsLoading] = React.useState(true)
    const popupState = useSelector((state) => state.pizzasSlice.popup)

    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    const limit = 3
    //const [selectedSort, setSelectedSort] = React.useState({name: 'Популярности', value: 'rating'}) //Categories state
    //const [selectedCategory, setSelectedCategory] = React.useState({name: 'Пицца', value: 'pizza'}) //
    const filter = useSelector((state) => state.filterSlice)
    const items = useSelector((state) => state.pizzasSlice.items)
    const dispatch = useDispatch()
    const search = filter.searchValue === ''? '' : `&search=${filter.searchValue}`
    const selectedSort = filter.sortDesc === true ? filter.selectedSort.value + 'Desc' : filter.selectedSort.value + 'Asc'


    const fetchPizzas = async () => {
        changeIsLoading(true)
        dispatch(getPizzas({ selectedCategory: filter.selectedCategory.value, selectedSort, search, currentPage: filter.currentPage, limit }))
        changeIsLoading(false)
    }   

    React.useEffect(() => {
        fetchPizzas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, search])

    console.log('Home')

    return (
        <div className="content">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ?[...new Array(6)].map((_, id) => <Skeleton key={id}/>)
                : 
                //console.log(items.rows)
                items.rows.map((item) => (
                    <PizzaBlock key={item.id} id={item.id} imgThick={item.img_thick} imgThin={item.img_thin} name={item.name} priceSmall={item.price_small} priceMedium={item.price_medium} priceLarge={item.price_large} description={item.description} />
                ))
                }
            </div>
            {Math.ceil(items.count / limit) > 1 &&
                <Pagination pageCount = {Math.ceil(items.count / limit)} currentPage={filter.currentPage}/>
            }
             {popupState && <PizzaModal/>}
        </div>
    )
}

export default Home