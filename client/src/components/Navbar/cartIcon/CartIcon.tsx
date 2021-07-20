import React from 'react'

import './CartIcon.scss';

import { useDispatch, useSelector } from "react-redux";

import Brightness1Icon from '@material-ui/icons/Brightness1';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { RootStore } from '../../../redux/store';


const CartIcon: React.FC<any> = ({onClick})=> {

    const cartState = useSelector((state: RootStore) => state.cart);
    const { cartItems} = cartState;


    return (
        <div className="cart" onClick={onClick}>
        <div className="cart-icon">
        {cartItems.length > 0 &&<Brightness1Icon className="blue-dot"/>}
        <ShoppingCartOutlinedIcon />
        </div>
        <p className="cart-number">{cartItems.length > 0 ? cartItems.length == 1 ? `${cartItems.length}Workshop in cart` : `${cartItems.length} Workshops in cart ` : "Cart is Empty"}</p>
    </div>
    )
}

export default CartIcon
