import axios from "axios";
import { Dispatch } from "react";
import { ADD_TO_CART, CartDispatchTypes, Cart, REMOVE_FROM_CART, CHANGE_QTY } from "./cartActionTypes";
import { Workshop } from "./workshopActionTypes";
import * as API from "../../api";

export const addToCart = (id:number, qty:number, singleAdd:boolean) => async (dispatch: Dispatch<CartDispatchTypes>, getState:any) =>{
    const {data} = await API.addToCartURL(id);
    const bla = {...data[0]}
    dispatch({
        type: ADD_TO_CART,
        payload: {
            ...data[0],
            qty,
            singleAdd:singleAdd
        }
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.products));
};

export const removeFromCart = (id:number) => (dispatch: Dispatch<CartDispatchTypes>, getState:any) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.products))
};

