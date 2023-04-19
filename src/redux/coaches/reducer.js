import { GET_COACHES, MORE_COACHES } from "./actionTypes";

const defaultState = [];

export function coachesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_COACHES:
      return action.coachesArr;
    // case MORE_COACHES:
    //   return [...state, action.payload];
    default:
      return state;
  }
}
