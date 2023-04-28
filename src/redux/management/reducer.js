import { GET_MANAGEMENT } from "./actionTypes";

const defaultState = [];

export function managementReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_MANAGEMENT:
      return action.managementArr;
    default:
      return state;
  }
}
