import axios from "axios";
import { Dispatch } from "redux";
import { IDeleteSub, ISubArr, ISubscription } from "../models/types";
import { HttpClient } from "../services/httpRequest";
import { ADD_SUB, ADD_SUBS } from "./constants";
// import { ADD_SUBSCRIPTIONS } from "./constants";

interface IActionAddSubscriptions {
  type: "ADD_SUBS";
  payload: ISubscription[];
}

const request = new HttpClient("http://172.28.0.48:8080/api/clients");

export const getSubscriptions = (id: Number) => (dispatch: Dispatch) => {
  request
    .get(`${id}/companies`)
    .then((response) =>
      dispatch({
        type: ADD_SUBS,
        payload: response,
      })
    )
    .catch((err) => console.error(err));
};

// export const addSub = (payload: ISubscription,id:number) => (dispatch: Dispatch) => {
//   request
//     .post(`${id}/companies`, payload)
//     .then((response) =>
//       dispatch({
//         type: ADD_SUBS,
//         payload: response,
//       })
//     )
//     .catch((err) => console.error(err));
// };

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
