import { GET_DANCERS, MORE_DANCERS } from "./actionTypes";

const defaultState = [];

export function dancersReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DANCERS:
      return action.dancersArr;
    // case MORE_DANCERS:
    //   return [...state, action.payload];
    default:
      return state;
  }
}
