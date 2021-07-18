import axios from "axios";
import { Dispatch } from "redux";
import {
  WorkshopDispatchTypes,
  GET_WORKSHOP_FAIL,
  GET_WORKSHOP_REQUEST,
  GET_WORKSHOP_SUCCESS,
  GET_WORKSHOP_BY_CATEGORY,
  RESET_WORKSHOP_LIST,
} from "./workshopActionTypes";

export const getWorkshops =
  (page: number) => async (dispatch: Dispatch<WorkshopDispatchTypes>) => {
    try {
      dispatch({
        type: GET_WORKSHOP_REQUEST,
      });
      const { data } = await axios.get(
        `http://localhost:3001/workshops?_page=${page}&_limit=9`
      );

      dispatch({
        type: GET_WORKSHOP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_WORKSHOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getWorkshopsByCategory =
  (/* page: number,  */category: string) =>
  async (dispatch: Dispatch<WorkshopDispatchTypes>) => {
    try {
      console.log(category);
      dispatch({
        type: GET_WORKSHOP_REQUEST,
      });

      const { data } = await axios.get(
        `http://localhost:3001/workshops?category=${category}`
      );

      dispatch({
        type: GET_WORKSHOP_BY_CATEGORY,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_WORKSHOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const resetWorkshopList =
  () =>
  async (dispatch: Dispatch<WorkshopDispatchTypes>) =>
    dispatch({
      type: RESET_WORKSHOP_LIST,
    });
