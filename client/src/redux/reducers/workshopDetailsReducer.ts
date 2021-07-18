import {
    Workshop,
    User,
    WorkshopDetailsDispatchTypes,
    GET_WORKSHOP_DETAILS_FAIL,
    GET_WORKSHOP_DETAILS_REQUEST,
    GET_WORKSHOP_DETAILS_SUCCESS,
  } from "../actions/workshopDetailsActionTypes";
  
  interface DefaultStateI {
    loading?: boolean;
    workshop?: Workshop;
    user?:User,
    error?: string;
  }
  const defaultState: DefaultStateI = {
    loading: false,
    error:"",
    
  };
  const workshopDetailsReducer = (
    state: DefaultStateI = defaultState,
    action: WorkshopDetailsDispatchTypes
  ): DefaultStateI => {
    switch (action.type) {
      case GET_WORKSHOP_DETAILS_REQUEST:
              return {
                loading: true,
                
              };
          
      case GET_WORKSHOP_DETAILS_SUCCESS:
    
          return {
            ...state,
            loading: false,
            workshop: action.payload.workshop,
            user: action.payload.user
          };
        
      case GET_WORKSHOP_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default workshopDetailsReducer;