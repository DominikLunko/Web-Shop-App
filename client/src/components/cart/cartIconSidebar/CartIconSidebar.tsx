import React from 'react'
import './CartIconSidebar.scss'

import Brightness1Icon from '@material-ui/icons/Brightness1';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const CartIconSidebar = () => {

    const numberOfItems = 1;
    return (
        <div className="cart">
        <div className="cart-icon">
        {numberOfItems > 0 &&<Brightness1Icon className="blue-dot-sidebar"/>}
        <ShoppingCartOutlinedIcon />
        </div>
        <p className="cart-number-sidebar">{numberOfItems > 0 ? numberOfItems == 1 ? `${numberOfItems}Workshop` : `${numberOfItems} Workshops ` : "Cart is Empty"}</p>
    </div>
    )
}

export default CartIconSidebar
