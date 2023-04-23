import { GET_DANCERS } from "./actionTypes";

const defaultState = [];

export function dancersReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DANCERS:
      return action.dancersArr;
    default:
      return state;
  }
}
