import { ISubArr } from "../models/types";
import { Actions } from "./actions";
import { ADD_FILTERED_SUBS, ADD_SUB, ADD_SUBS } from "./constants";

const initialState: ISubArr = {
  subscriptions: [],
  filteredSubscriptions: [],
};

export default function subscriptionReducer(
  state: ISubArr = initialState,
  action: Actions
): ISubArr {
  switch (action.type) {
    case ADD_SUBS: {
      return { ...state, subscriptions: action.payload };
    }
    case ADD_FILTERED_SUBS: {
      return { ...state, filteredSubscriptions: action.payload };
    }
    default:
      return state;
  }
}
