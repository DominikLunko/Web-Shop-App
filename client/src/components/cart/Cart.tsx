import React, { useState } from "react";
import "./Cart.scss";


import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col } from "reactstrap";

import CloseIcon from "@material-ui/icons/Close";
import CartIconSidebar from "./cartIconSidebar/CartIconSidebar";
import { RootStore } from "../../redux/store";
import CartItem from "./CartItem/CartItem";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const Cart: React.FC<any> = ({ onClick, show, setShowCheckout }) => {
  const dispatch = useDispatch()
  const cartState = useSelector((state: RootStore) => state.cart);
  const { products} = cartState;

  const qtyChangeHandler = (id:number, qty:number) => {
    dispatch(addToCart(id, qty,true));
  };

  const removeHandler = (id:number) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return products.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return products.reduce((price, item) => item.price * item.qty + price, 0);
  };

  return (
      <div className={show ? "sidebar active" : "sidebar"}>
        <div className="title-and-close">
          <CartIconSidebar numOfItems={products.length}/>
          <CloseIcon style={{ cursor: "pointer" }} onClick={onClick} />
        </div>
        <Container className="cart-items-container">
          <Row className="row-cart" xl="1" lg="1" md="1" xs="1">
            {products &&
              products.map((product,idx) => (
                <Col  key={idx}>
                  <CartItem
                    key={product.id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    id={product.id}
                    price={product.price}
                    userId={product.userId}
                    qty={product.qty}
                    qtyChangeHandler={qtyChangeHandler}
                    removeHandler={removeHandler}
                  />
                </Col>
              ))}
          </Row>
        </Container>
        {products.length > 0 &&
        <div className="subtotal-wrap">
                <p>SUBTOTAL ({getCartCount()}) ITEMS</p>
                <h2>${getCartSubTotal().toFixed(2)} EUR</h2>
                <button onClick={() => setShowCheckout(true)}>CHECKOUT</button>
        </div>
        }
      </div>
  );
};

export default Cart;
