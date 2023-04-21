import { GET_JUDGES, MORE_JUDGES } from "./actionTypes";

const defaultState = [];

export function judgesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_JUDGES:
      return action.judgesArr;
    // case MORE_JUDGES:
    //   return [...state, action.payload];
    default:
      return state;
  }
}
