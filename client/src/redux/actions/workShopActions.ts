import axios from "axios";
import { Dispatch } from "redux";
import { DefaultStateI } from "../reducers/workshopReducers";
import {
  WorkshopDispatchTypes,
  GET_WORKSHOP_FAIL,
  GET_WORKSHOP_REQUEST,
  GET_WORKSHOP_SUCCESS,
  RESET_WORKSHOP_LIST,
  PAGE_AND_CATEGORY,
  INCREASE_PAGE_NUMBER,
  CHANGE_CATEGORY,
} from "./workshopActionTypes";

export const getWorkshops =
  (page: number, category: string) =>
  async (dispatch: Dispatch<WorkshopDispatchTypes>) => {
    try {
      dispatch({
        type: GET_WORKSHOP_REQUEST,
      });

      if (category != "all") {
        const { data } = await axios.get(
          `http://localhost:3001/workshops?category=${category}&_page=${page}&_limit=9`
        );
        const allData = await axios.get(`http://localhost:3001/workshops?category=${category}`);
        dispatch({
          type: GET_WORKSHOP_SUCCESS,
          payload: {
            workshops: data,
            numberOfData: allData.data.length,
          },
        });
      } else {
        const { data } = await axios.get(
          `http://localhost:3001/workshops?_page=${page}&_limit=9`
        );
        const allData = await axios.get("http://localhost:3001/workshops");
        dispatch({
          type: GET_WORKSHOP_SUCCESS,
          payload: {
            workshops: data,
            numberOfData: allData.data.length,
          },
        });
      }
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
  () => async (dispatch: Dispatch<WorkshopDispatchTypes>) =>
    dispatch({
      type: RESET_WORKSHOP_LIST,
    });

export const pageAndCategory =
  (page: number, category: string) =>
  async (dispatch: Dispatch<WorkshopDispatchTypes>) =>
    dispatch({
      type: PAGE_AND_CATEGORY,
      payload: {
        page: page,
        category: category,
      },
    });

export const increasePage =
  () => async (dispatch: Dispatch<WorkshopDispatchTypes>) => {
    dispatch({
      type: INCREASE_PAGE_NUMBER,
    });
  };
export const changeCategory =
  (category: string) => async (dispatch: Dispatch<WorkshopDispatchTypes>) => {
    let URL = `http://localhost:3001/workshops`;
    if (category !== "all") URL = URL + `?category=${category}`;
    const { data } = await axios.get(URL);

    dispatch({
      type: CHANGE_CATEGORY,
      payload: {
        category: category,
        numberOfData: data.length,
      },
    });
  };
