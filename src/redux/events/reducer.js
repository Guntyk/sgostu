import { GET_EVENTS } from "./actionTypes";

const defaultState = [];

export function eventsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return [...action.eventsArr];
    default:
      return state;
  }
}
