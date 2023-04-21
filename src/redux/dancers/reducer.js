import { GET_DANCERS, MORE_DANCERS } from "./actionTypes";

const defaultState = [];

export function dancersReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DANCERS:
      return action.dancersArr;
    case MORE_DANCERS:
      console.log(action.dancersArr);
      return [...state, ...action.dancersArr];
    default:
      return state;
  }
}
