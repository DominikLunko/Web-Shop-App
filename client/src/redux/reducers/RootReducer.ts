import { combineReducers } from "redux";
import workshopReducer from "./workshopReducers";
import workshopDetailsReducer from "./workshopDetailsReducer";

const RootReducer = combineReducers({
    workshop: workshopReducer,
    workshopDetails: workshopDetailsReducer
});

export default RootReducer;