import { GET_REGIONS } from "./actionTypes";

const defaultState = [];

export function regionsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_REGIONS:
      return action.regionsArr;
    default:
      return state;
  }
}
