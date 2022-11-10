import React from "react";
import {useDispatch} from 'react-redux'
import debounce from 'lodash.debounce'

import {setSearchValue} from '../redux/slices/FilterSlice'

export const Search = () => {
    const [searchValue, changeSearchValue] = React.useState('')
    const dispatch = useDispatch();
    const inputRef = React.useRef();

    // const changeSearchValue = (value) => {
    //     dispatch(setSearchValue(value))
    // }

    const onChangeValue = value => {
        changeSearchValue(value)
        changeReduxSearchValue(value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const changeReduxSearchValue = React.useCallback(
        debounce((value) => {
            //console.log(value)
            dispatch(setSearchValue(value))
        }, 500), []
    )

    return (
        <div className="root">
            <input key='input' ref={inputRef} value={searchValue} className="input" placeholder="Поиск ..." onChange={(event) => {
                onChangeValue(event.target.value)
                
                }}/>
            {searchValue && ( 
            <svg
            className='clearIcon'
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
                changeSearchValue('');
                changeReduxSearchValue('');
                inputRef.current.focus();
                }}>
            <path  d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
            </svg>)}
        </div>
    )
}

export default Search