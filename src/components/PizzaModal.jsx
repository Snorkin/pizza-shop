import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {addItem} from '../redux/slices/CartSlice'
import {changePopupState} from '../redux/slices/PizzasSlice'

function PizzaModal(){
    const dispatch = useDispatch()
    const selectedPizza = useSelector(state => state.pizzasSlice.selectedPizza)
    const count = useSelector(state => state.cartSlice.items.filter(item => item.id === selectedPizza.id)) || [{count: 0}]
    const [activeType, setActiveType] = React.useState(0)
    const [activeSize, setActiveSize] = React.useState(0)
    const [price, changePrice] = React.useState(selectedPizza.priceSmall)
    const [img, changeImg] = React.useState(`http://localhost:5000/${selectedPizza.imgThin}`)
    const types = ['Тонкое', 'Традиционное']
    const sizes = ['25', '30', '35']
    const popupRef = React.useRef();
    const isMounted = React.useRef(false)

    let addedCount = 0;
    count.forEach(element => addedCount += element.count);

React.useEffect(() => {
    const clickOutside = (event) => {
        if(isMounted.current){
            if(!event.composedPath().includes(popupRef.current)){
                dispatch(changePopupState())
              }
        }
        isMounted.current = true
      
    }
        document.body.style = "overflow:hidden;"
        document.body.addEventListener('click', clickOutside)
    return () => {
        document.body.style = "overflow:auto;"
        document.body.removeEventListener('click', clickOutside)

    }
  }, [])

    const onClickAdd = () => {
        const item = {
            id: selectedPizza.id,
            title: selectedPizza.name, 
            price: price,
            img, 
            type: activeType,
            size: activeSize
        }
        dispatch(addItem(item))
        //console.log(count)
    }

  return (
    <div className='popup'>
        <div ref={popupRef} className='popup__content'>
          <img
          className="popup__content__image"
          src= {img}
          alt="Pizza"
          />
          
          <div className='popup__content__info'>
          <h4 className="popup__content__info__title">{selectedPizza.name}</h4>
        <div className='popup__content__info__description'>
            <p>{selectedPizza.description}</p>
        </div>
        <div className="popup__content__info__selector">
            <ul>
                {
                    types.map((value, id) => (
                        <li onClick={() => {
                            setActiveType(id)
                            if(value === types[0]){
                                changeImg(`http://localhost:5000/${selectedPizza.imgThin}`)
                            } else {changeImg(`http://localhost:5000/${selectedPizza.imgThick}`)}
                        }} className={activeType === id ? 'active' : ''} key = {id}>{value}</li>
                    ))
                }
            </ul>
            <ul>
                {
                    sizes.map((value, id) => (
                        <li onClick={() => {
                            setActiveSize(id)
                            if (value === sizes[0])
                                changePrice(selectedPizza.priceSmall)
                            if (value === sizes[1])
                                changePrice(selectedPizza.priceMedium)
                            if (value === sizes[2])
                                changePrice(selectedPizza.priceLarge)
                            // console.log(value)
                        }} className={activeSize === id ? 'active' : ''} key = {id}>{value} см.</li>
                    ))    
                }
            </ul>
        </div>
        <div className="popup__content__info__bottom">
            <div className="popup__content__info__price">{price} руб.</div>
                <button onClick={() => onClickAdd()} className="button button--outline button--add">
                    <span>{addedCount > 0 ? 'Добавлено ' : 'Выбрать'}</span>
                    {addedCount > 0 &&
                        <i>{addedCount}</i>
                    }
                </button>
            </div>
        </div>
      </div>
    </div>

          
  )
}

export default PizzaModal