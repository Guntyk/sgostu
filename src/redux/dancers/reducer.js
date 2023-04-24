import { GET_DANCERS, GET_DANCER } from "./actionTypes";

const defaultState = [];

export function dancersReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DANCERS:
      return action.dancersArr;
    case GET_DANCER:
      return action.dancerObj;
    default:
      return state;
  }
}
