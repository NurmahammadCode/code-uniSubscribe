import axios from "axios";
import { Dispatch } from "redux";
import {
  IDeleteSub,
  IFilterSubs,
  ISubArr,
  ISubscription,
} from "../models/types";
import { HttpClient } from "../services/httpRequest";
import { ADD_FILTERED_SUBS, ADD_SUB, ADD_SUBS } from "./constants";
// import { ADD_SUBSCRIPTIONS } from "./constants";

interface IActionGetSubscriptions {
  type: "ADD_SUBS";
  payload: ISubscription[];
}

interface IActionGetFilteredSubs {
  type: "ADD_FILTERED_SUBS";
  payload: ISubscription[];
}

// interface IActionSignIn {
//   type: "SIGN_IN",
//   payload:
// }

const request = new HttpClient("http://172.28.0.33:8080/api/clients");

export const getSubscriptions = (id: Number) => (dispatch: Dispatch) => {
  request
    .get(`${id}/subscriptions`)
    .then((response) =>
      dispatch({
        type: ADD_SUBS,
        payload: response.data,
      })
    )
    .catch((err) => console.error(err));
};

export const getFilteredSubs =
  (id: Number, pageNumber: Number, numberOfCount: Number) =>
  (dispatch: Dispatch) => {
    request
      .get(
        `${id}/subscriptions?pageNumber=${pageNumber}&countOfData=${numberOfCount}`
      )
      .then((response) =>
      {console.log("nurmehemmed",response.data.dataInPage); dispatch({
          type: ADD_FILTERED_SUBS,
          payload: response.data.dataInPage,
        })}
        
      )
      .catch((err) => console.error(err));
  };

export const addSub = (payload: any, id: Number) => (dispatch: Dispatch) => {
  request
    .post(`${id}/subscription`, payload)
    .then((response) => {
      dispatch({
        type: ADD_SUBS,
        payload: response.data,
      });
    })
    .catch((err) => console.error(err));
};

export const deleteSub =
  (userId: Number, subId: Number) => (dispatch: Dispatch) => {
     request
      .delete(`${userId}/subscriptions/delete/${subId}`)
      .then((response) =>
        dispatch({
          type: ADD_SUBS,
          payload: response,
        })
      )
      .catch((err) => console.error(err));
  };

export const editSub =
  (payload: any, userId: Number, subId: Number) => (dispatch: Dispatch) => {
    request
      .edit(`${userId}/subscriptions/update/${subId}`, payload)
      .then((response) => {
        console.log("edited data", response.data);
        dispatch({
          type: ADD_SUBS,
          payload: response,
        });
      })
      .catch((err) => console.error(err));
  };

export type Actions = IActionGetSubscriptions | IActionGetFilteredSubs;

export type DispatchType = (args: ISubArr) => ISubArr;
