import { GET_CLUBS } from "./actionTypes";

const defaultState = [];

export function clubsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_CLUBS:
      return action.clubsArr;
    default:
      return state;
  }
}
