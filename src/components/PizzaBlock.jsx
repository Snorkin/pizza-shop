import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {setSelectedPizza, changePopupState} from '../redux/slices/PizzasSlice'

function PizzaBlock(props) {
    const dispatch = useDispatch();
    const count = useSelector(state => state.cartSlice.items.filter(item => item.id === props.id)) || [{count: 0}]

    let addedCount = 0;
    count.forEach(element => addedCount += element.count);

    const openModal = () => {
        // const item = {
        //     id: props.id,
        //     title: props.name, 
        //     price: price,
        //     img, 
        //     type: activeType,
        //     size: activeSize
        // }
        dispatch(setSelectedPizza(props))
        dispatch(changePopupState())
        //console.log(props)
    }
    
    return ( 
    <div className="pizza-block">
        <img
        className="pizza-block__image"
        src= {`http://localhost:5000/${props.imgThin}`}
        alt="Pizza"
        />
        <h4 className="pizza-block__title">{props.name}</h4>
        <div className='pizza-block__description'>
            <p>{props.description}</p>
        </div>
        <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {props.priceSmall} ₽</div>
                <button onClick={openModal} className="button button--outline button--add">
                    <span>{addedCount > 0 ? 'Добавлено ' : 'Выбрать'}</span>
                    {addedCount > 0 && 
                        <i>{addedCount}</i>
                    }
                </button>
        </div>
    </div>)
}
export default PizzaBlock