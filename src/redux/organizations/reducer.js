import { GET_ORGANIZATIONS } from "./actionTypes";

const defaultState = [];

export function organizationsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ORGANIZATIONS:
      return [...action.orgsArr];
    default:
      return state;
  }
}
