import { createStore, applyMiddleware} from 'redux'
import RootReducer from './reducers/RootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const cartFromLocalStorage = localStorage.getItem("cart")
console.log(cartFromLocalStorage)

const INITIAL_STATE = {
    cart: {
        cartItems: cartFromLocalStorage
    }
}

const store = createStore(RootReducer,/* INITIAL_STATE, */ composeWithDevTools(applyMiddleware(thunk)));




export type RootStore =ReturnType<typeof RootReducer>

export default store;