import axios from "axios";
import { Dispatch } from "redux";
import { IDeleteSub, ISubArr, ISubscription } from "../models/types";
import { ADD_SUB, ADD_SUBS } from "./constants";
// import { ADD_SUBSCRIPTIONS } from "./constants";

interface IActionAddSubscriptions {
  type: "ADD_SUBS";
  payload: ISubscription[];
}

export const addSubscriptions =
  (payload: ISubscription[]) => (dispatch: Dispatch) => {
    axios
      .get("http://localhost:5000/cards")
      .then((response) =>
        dispatch({
          type: ADD_SUBS,
          payload: response,
        })
      )
      .catch((err) => console.error(err));
  };

export const addSub = (payload: ISubscription) => (dispatch: Dispatch) => {
  axios
    .post("http://localhost:5000/delete", payload)
    .then((response) =>
      dispatch({
        type: ADD_SUBS,
        payload: response,
      })
    )
    .catch((err) => console.error(err));
};

export const deleteSub = (payload: IDeleteSub) => (dispatch: Dispatch) => {
  axios
    .post("http://localhost:5000/delete", payload)
    .then((response) =>
      dispatch({
        type: ADD_SUBS,
        payload: response,
      })
    )
    .catch((err) => console.error(err));
};

export const editSub = (payload: IDeleteSub) => (dispatch: Dispatch) => {
  axios
    .post("http://localhost:5000/delete", payload)
    .then((response) =>
      dispatch({
        type: ADD_SUBS,
        payload: response,
      })
    )
    .catch((err) => console.error(err));
};

export type Actions = IActionAddSubscriptions;

export type DispatchType = (args: ISubArr) => ISubArr;
