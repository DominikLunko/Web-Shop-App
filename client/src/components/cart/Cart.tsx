import React, { useState } from "react";
import "./Cart.scss";

import CloseIcon from "@material-ui/icons/Close";
import CartIconSidebar from "./cartIconSidebar/CartIconSidebar";

const Cart: React.FC<any> = ({ onClick, show }) => {
  return (
      <div className={show ? "sidebar active" : "sidebar"}>
        <div className="title-and-close">
          <CartIconSidebar />
          <CloseIcon style={{ cursor: "pointer" }} onClick={onClick} />
        </div>
      </div>
  );
};

export default Cart;
