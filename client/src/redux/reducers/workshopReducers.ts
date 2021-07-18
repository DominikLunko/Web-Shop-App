import {
  Workshop,
  WorkshopDispatchTypes,
  GET_WORKSHOP_FAIL,
  GET_WORKSHOP_REQUEST,
  GET_WORKSHOP_SUCCESS,
  GET_WORKSHOP_BY_CATEGORY,
  RESET_WORKSHOP_LIST,
} from "../actions/workshopActionTypes";

interface DefaultStateI {
  loading?: boolean;
  workshops: Workshop[];
  error?: string;
}
const defaultState: DefaultStateI = {
  loading: false,
  workshops: [],
  // error:""
};
const workshopReducer = (
  state: DefaultStateI = defaultState,
  action: WorkshopDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case GET_WORKSHOP_BY_CATEGORY:
      console.log(action.payload)
      return {
        loading: false,
        workshops: action.payload,
      };

    case RESET_WORKSHOP_LIST:
      return (state = {
        workshops: [],
      });
    case GET_WORKSHOP_REQUEST:
      if (state.workshops?.length > 0) {
        return {
          workshops: state.workshops,
        };
      } else {
        return {
          loading: true,
          workshops: state.workshops,
        };
      }
    case GET_WORKSHOP_SUCCESS:
      if (state.workshops) {
        return {
          ...state,
          loading: false,
          workshops: [...state.workshops, ...action.payload],
        };
      } else {
        return {
          ...state,
          loading: false,
          workshops: action.payload,
        };
      }
    case GET_WORKSHOP_FAIL:
      return {
        loading: false,
        error: action.payload,
        workshops: [],
      };
    default:
      return state;
  }
};

export default workshopReducer;

// export const getWorkshopDetailsReducer = (state = { product: {}}, action) => {
//     switch(action.type){
//         case GET_PRODUCT_DETAILS_REQUEST:
//             return {
//                 loading: true,
//             }
//         case GET_PRODUCT_DETAILS_SUCCESS:
//             return {
//                 loading: false,
//                 product: action.payload
//             }
//         case GET_PRODUCT_DETAILS_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload
//             }
//         case GET_PRODUCT_DETAILS_RESET:
//             return {
//                 product: {}
//             }
//         default:
//             return state;
//     }
// }
