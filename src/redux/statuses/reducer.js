import { GET_STATUSES } from "./actionTypes";

const defaultState = [];

export function statusesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_STATUSES:
      return action.statusesArr;
    default:
      return state;
  }
}
