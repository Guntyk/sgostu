import { GET_CLUBS, MORE_CLUBS } from "./actionTypes";

const defaultState = [];

export function clubsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_CLUBS:
      return action.clubsArr;
    // case MORE_CLUBS:
    //   return [...state, action.payload];
    default:
      return state;
  }
}
