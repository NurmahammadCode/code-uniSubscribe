import axios from "axios";
import { Dispatch } from "redux";
import { IDeleteSub, ISubArr, ISubscription } from "../models/types";
import { HttpClient } from "../services/httpRequest";
import { ADD_SUB, ADD_SUBS } from "./constants";
// import { ADD_SUBSCRIPTIONS } from "./constants";

interface IActionGetSubscriptions {
  type: "ADD_SUBS";
  payload: ISubscription[];
}

// interface IActionSignIn {
//   type: "SIGN_IN",
//   payload:
// }

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

export const addSub =
  (payload: ISubscription, id: number) => (dispatch: Dispatch) => {
    request
      .post(`${id}/companies`, payload)
      .then((response) =>
        dispatch({
          type: ADD_SUBS,
          payload: response,
        })
      )
      .catch((err) => console.error(err));
  };

export const deleteSub =
  (userId: Number, subId: Number) => (dispatch: Dispatch) => {
    request
      .delete(`${userId}/companies/${subId}`)
      .then((response) =>
        dispatch({
          type: ADD_SUBS,
          payload: response,
        })
      )
      .catch((err) => console.error(err));
  };

export const editSub =
  (payload: IDeleteSub, userId: Number, subId: Number) =>
  (dispatch: Dispatch) => {
    request
      .edit(`${userId}/companies/${subId}`, payload)
      .then((response) =>
        dispatch({
          type: ADD_SUBS,
          payload: response,
        })
      )
      .catch((err) => console.error(err));
  };

export type Actions = IActionGetSubscriptions;

export type DispatchType = (args: ISubArr) => ISubArr;
