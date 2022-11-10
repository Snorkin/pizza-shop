import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {changeCurrentPage} from '../redux/slices/FilterSlice'



const Pagination = ({pageCount}) => {
    const dispatch = useDispatch()
    const selectedPage = useSelector((state) => state.filterSlice.currentPage)
    const pages = []
    //console.log('выбранная сука страница '+ selectedPage)
    const changePage = (value) => {
        dispatch(changeCurrentPage(value))
    }

    for (let i = 1; i <= pageCount; i++){
        pages.push(i)
    }
    
    return (
        <div className="pagination">
            <ul>

            <li className="page-back" onClick={() => {
                if (selectedPage > 1)
                    changePage(selectedPage-1)
            }}>{"<"}
            </li>
                {
                    pages.map((value) => (
                        <li  key={value} className={selectedPage === value ? 'active' : ''}  onClick={() => {changePage(value)}}>
                                {value}
                        </li>
                    ))
                }
            <li className="page-forward" onClick={() => {
                if (selectedPage < pageCount)
                    changePage(selectedPage+1)
            }}>{">"}
            </li>
            </ul>
        </div>
        
    )
}

export default Pagination