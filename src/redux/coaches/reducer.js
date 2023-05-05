import { GET_COACHES } from "./actionTypes";

const defaultState = [];

export function coachesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_COACHES:
      return action.coachesArr;
    default:
      return state;
  }
}
