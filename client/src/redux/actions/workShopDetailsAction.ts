import axios from "axios";
import { Dispatch } from "redux";
import {
    WorkshopDetailsDispatchTypes,
    GET_WORKSHOP_DETAILS_REQUEST,
    GET_WORKSHOP_DETAILS_SUCCESS,
    GET_WORKSHOP_DETAILS_FAIL,
    WORKSHOP_DETAILS_RESET,
} from "./workshopDetailsActionTypes";

export const getWorkshopDetail =
  (id:number, userId:number) =>
  async (dispatch: Dispatch<WorkshopDetailsDispatchTypes>) => {
    try {
      dispatch({
        type: GET_WORKSHOP_DETAILS_REQUEST,
      });
      const resWorkshop = await axios.get(`http://localhost:3001/workshops/${id}`);
      const resUser = await axios.get(`http://localhost:3001/users/${userId}`);
      const similarWorkshops = await axios.get(`http://localhost:3001/workshops?category=${resWorkshop.data.category}&_limit=9`);
      setTimeout(()=>{
          dispatch({
            type: GET_WORKSHOP_DETAILS_SUCCESS,
            payload: {
                workshop:resWorkshop.data,
                user:resUser.data,
                similarWorkshops:similarWorkshops.data
            },
          });
      },500)
    } catch (error) {
      dispatch({
        type: GET_WORKSHOP_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const workshopDetailReset =
  () =>
 (dispatch: Dispatch<WorkshopDetailsDispatchTypes>) => {
  
      dispatch({
        type: WORKSHOP_DETAILS_RESET,
      });
    
  };