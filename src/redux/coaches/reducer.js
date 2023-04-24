import { GET_COACHES, GET_COACH } from "./actionTypes";

const defaultState = [];

export function coachesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_COACHES:
      return action.coachesArr;
    case GET_COACH:
      return action.coachObj;
    default:
      return state;
  }
}
