import { combineReducers, createStore } from "redux";
import { reducer as commandReducer } from "./command";
import { reducer as todoReducer } from "./todo";

export default createStore(
  combineReducers({
    todo: todoReducer,
    command: commandReducer,
  })
);
