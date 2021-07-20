import { combineReducers } from "redux";
import workshopReducer from "./workshopReducers";
import workshopDetailsReducer from "./workshopDetailsReducer";
import { cartReducer } from "./cartReducer";

const RootReducer = combineReducers({
    workshop: workshopReducer,
    workshopDetails: workshopDetailsReducer,
    cart:cartReducer
});

export default RootReducer;