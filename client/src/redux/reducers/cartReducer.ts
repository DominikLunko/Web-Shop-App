import { Workshop } from "../actions/workshopActionTypes";

import { CartDispatchTypes, ADD_TO_CART, REMOVE_FROM_CART, Cart } from "../actions/cartActionTypes";

  export interface DefaultStateI {
    products: Cart[];
    // cost:number
  }
  const defaultState: DefaultStateI = {
    products: [],
    // cost:0
  };


export const cartReducer = (state:DefaultStateI = defaultState, action:CartDispatchTypes) => {
    switch(action.type){
        case ADD_TO_CART:
            const item = {
                ...action.payload
            }

            const existItem = state.products.find((x) => x.id === item.id);

            if(existItem){
                if(item.fromCart == false){
                    item.qty = existItem.qty + 1
                }
                return {
                    ...state,
                    // cost:state.cost + (action.payload.price*action.payload.qty),
                    products: state.products.map((x) => x.id === existItem.id ? item : x)
                }
            } else {
                return {
                    ...state,
                    // cost:state.cost + action.payload.price*action.payload.qty,
                    products: [...state.products, item],
                };
            }
        
        case REMOVE_FROM_CART:
            return {
                ...state,
                products: state.products.filter((x) => x.id !== action.payload)
                // cost:state.cost - state.products.find((x) => x.id !== action.payload)?.qty*pr
            }

        default:
            return state;
    }
}