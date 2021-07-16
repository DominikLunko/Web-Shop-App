import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss';

import Brightness1Icon from '@material-ui/icons/Brightness1';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const Navbar:React.FC = () => {

    const numberOfItems = 1;

    return (
        <div className="container">
            <Link className="navbar__logo" to="/">
                <p className="tinel-text">tinel</p>
                <p className="workshop-text">Workshop</p>
            </Link>
            <div className="cart">
                <div>
                {numberOfItems > 0 &&<Brightness1Icon className="blue-dot"/>}
                <ShoppingCartOutlinedIcon />
                </div>
                <p className="cart-number">{numberOfItems >0 ? (numberOfItems == 1 ? `${numberOfItems}Workshop in cart` : `${numberOfItems} Workshops in cart `) : "Cart is Empty"}</p>
            </div>
        </div>
    )
}

export default Navbar;
