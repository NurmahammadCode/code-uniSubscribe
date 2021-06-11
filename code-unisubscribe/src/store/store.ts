import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { ISubArr } from "../models/types";
import { Actions, DispatchType } from "./actions";
import subscriptionReducer from "./reducer";

const store: Store<ISubArr, Actions> & {
  dispatch: DispatchType;
} = createStore(subscriptionReducer, applyMiddleware(thunk));

export default store;
