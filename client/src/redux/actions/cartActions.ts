import axios from "axios";
import { Dispatch } from "react";
import { ADD_TO_CART, CartDispatchTypes, Cart, REMOVE_FROM_CART } from "./cartActionTypes";
import { Workshop } from "./workshopActionTypes";

export const addToCart = (id:number, qty:number, singleAdd:boolean) => async (dispatch: Dispatch<CartDispatchTypes>, getState:any) =>{
    // const { data } = await axios.get(`/api/products/${id}`);
    const cartElem = getState().workshop.workshops.find((workshop: Workshop)=>workshop.id ==id)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            ...cartElem,
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