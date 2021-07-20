import React, { useState } from "react";
import "./Cart.scss";


import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col } from "reactstrap";

import CloseIcon from "@material-ui/icons/Close";
import CartIconSidebar from "./cartIconSidebar/CartIconSidebar";
import { RootStore } from "../../redux/store";
import CartItem from "./CartItem/CartItem";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const Cart: React.FC<any> = ({ onClick, show }) => {
  const dispatch = useDispatch()
  const cartState = useSelector((state: RootStore) => state.cart);
  const { cartItems} = cartState;

  const qtyChangeHandler = (id:number, qty:number) => {
    dispatch(addToCart(id, qty,true));
  };

  const removeHandler = (id:number) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  return (
      <div className={show ? "sidebar active" : "sidebar"}>
        <div className="title-and-close">
          <CartIconSidebar numOfItems={cartItems.length}/>
          <CloseIcon style={{ cursor: "pointer" }} onClick={onClick} />
        </div>
        <Container className="cart-items-container">
          <Row className="row-cart" xl="1" lg="1" md="1" xs="1">
            {cartItems &&
              cartItems.map((cartItem,idx) => (
                <Col key={idx}>
                  <CartItem
                    key={cartItem.id}
                    imageUrl={cartItem.imageUrl}
                    title={cartItem.title}
                    id={cartItem.id}
                    price={cartItem.price}
                    userId={cartItem.userId}
                    qty={cartItem.qty}
                    qtyChangeHandler={qtyChangeHandler}
                    removeHandler={removeHandler}
                  />
                </Col>
              ))}
          </Row>
        </Container>
        {cartItems.length > 0 &&
        <div className="subtotal-wrap">
                <p>SUBTOTAL ({getCartCount()}) ITEMS</p>
                <h2>${getCartSubTotal().toFixed(2)} EUR</h2>
        </div>
        }
      </div>
  );
};

export default Cart;
