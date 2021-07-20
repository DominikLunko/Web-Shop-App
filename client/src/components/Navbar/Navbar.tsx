import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";


import CartIcon from './cartIcon/CartIcon';



// interface MyProps {
//   onClick: React.MouseEventHandler<HTMLButtonElement>
// }



const Navbar: React.FC<any> = ({onClick}) => {


  return (
    <div className="nav">
    <div className="navbar">
      <div className="navbar__logo">
          <Link className="logo-link" to="/" >
            <p className="tinel-text">tinel</p>
            <p className="workshop-text">Workshop</p>
          </Link>
      </div>
      <div className="cart_div">
      <CartIcon onClick={onClick}/>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
