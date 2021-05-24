import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { changeSearch } from '../store/slices/commonSlice';

const CartDiv = styled.div`
    .badge{
        font-size: x-small;
        position: absolute;
        top: 10px;
    }
`;


function Header(props) {
    const items = useSelector((state) => state.cart.items)
    const [searchBox, setSearchBox] = useState('')
    const history = useHistory();
    const dispatch = useDispatch()

    const onClickCart = () => {
        history.push('/cart')
    }

    const onClickSearch = () => {
        dispatch(changeSearch(searchBox))
    }
    
    return (
        <header>
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <div className="navbar-brand d-flex align-items-center">
                        <input value={searchBox} className="form-control" type="text" name="search" onChange={e=>setSearchBox(e.target.value)} />
                        <button className="btn btn-light ms-1" onClick={onClickSearch}>
                            <FontAwesomeIcon className="mr-2" icon={['fas','search']} />
                        </button>
                    </div>
                    <CartDiv className="" >
                        <button className="btn btn-light" onClick={onClickCart}>
                            <FontAwesomeIcon className="mr-2" icon={['fas','shopping-cart']} />
                            {
                                items.length > 0 && (
                                    <span className="badge rounded-pill bg-primary">{items.length}</span >
                                )
                            }
                        </button>
                        
                    </CartDiv>
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {

}

export default Header

