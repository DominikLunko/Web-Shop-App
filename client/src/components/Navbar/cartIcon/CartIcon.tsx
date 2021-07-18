import React from 'react'

import './CartIcon.scss';

import Brightness1Icon from '@material-ui/icons/Brightness1';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';


const CartIcon: React.FC<any> = ({onClick})=> {

    const numberOfItems = 1 ;


    return (
        <div className="cart" onClick={onClick}>
        <div className="cart-icon">
        {numberOfItems > 0 &&<Brightness1Icon className="blue-dot"/>}
        <ShoppingCartOutlinedIcon />
        </div>
        <p className="cart-number">{numberOfItems > 0 ? numberOfItems == 1 ? `${numberOfItems}Workshop in cart` : `${numberOfItems} Workshops in cart ` : "Cart is Empty"}</p>
    </div>
    )
}

export default CartIcon
