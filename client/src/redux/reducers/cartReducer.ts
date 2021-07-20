import { Workshop } from "../actions/workshopActionTypes";

import { CartDispatchTypes, ADD_TO_CART, REMOVE_FROM_CART, Cart } from "../actions/cartActionTypes";

  export interface DefaultStateI {
    cartItems: Cart[];
  }
  const defaultState: DefaultStateI = {
    cartItems: [],
  };


export const cartReducer = (state:DefaultStateI = defaultState, action:CartDispatchTypes) => {
    switch(action.type){
        case ADD_TO_CART:
            const item = {
                ...action.payload
            }

            const existItem = state.cartItems.find((x) => x.id === item.id);

            if(existItem){
                if(item.fromCart == false){
                    item.qty = existItem.qty + 1
                }
                return {
                    ...state,
                    // cost:state.cost + (action.payload.price*action.payload.qty),
                    cartItems: state.cartItems.map((x) => x.id === existItem.id ? item : x)
                }
            } else {
                return {
                    ...state,
                    // cost:state.cost + action.payload.price*action.payload.qty,
                    cartItems: [...state.cartItems, item],
                };
            }
        
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.id !== action.payload)
                // cost:state.cost - 
            }

        default:
            return state;
    }
}