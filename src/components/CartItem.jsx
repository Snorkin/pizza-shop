import React from 'react'
import {useDispatch} from 'react-redux'

import {addItem, removeItem} from '../redux/slices/CartSlice'

function CartItem(items){
    const dispatch = useDispatch() 

    const onClickAddOne = () => {
        console.log(items)
        dispatch(addItem({
            id: items.id,
            type: items.type,
            size: items.size
        }))
    }

    const onClickRemoveOne = () => {
        dispatch(removeItem({
            id: items.id,
            type: items.type,
            size: items.size,
            count: 1
        }))
    }

    const onClickRemoveAll = () => {
        if(window.confirm('Вы уверены?'))
            dispatch(removeItem({
                id: items.id,
                type: items.type,
                size: items.size,
                count: 0
            }))
    }

  return (
    <div className="cart__item">
        <div className="cart__item-img">
            <img
                className="pizza-block__image"
                src={items.img}
                alt="Pizza"
            />
        </div>
        <div className="cart__item-info">
        <h3>{items.title}</h3>
        <p>{items.type === 0 ? 'Тонкое тесто' : 'Традиционное тесто'}, {items.size === 0 ? '25 см.' : items.size === 1 ? '30 см.' : '35 см.'}</p>
        </div>
        <div className="cart__item-count">
        <button onClick={onClickRemoveOne} className="button button--outline button--circle cart__item-count-minus">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E"/>
        <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E"/>
        </svg>

        </button>
        <b>{items.count}</b>
        <button onClick={onClickAddOne} className="button button--outline button--circle cart__item-count-plus">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E"/>
        <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E"/>
        </svg>

        </button>
        </div>
        <div className="cart__item-price">
        <b>{items.price * items.count} ₽</b>
        </div>
        <div onClick={onClickRemoveAll} className="cart__item-remove">
        <div className="button button--outline button--circle">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E"/>
        <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E"/>
        </svg>

        </div>
        </div>
    </div>
  )
}
export default CartItem;