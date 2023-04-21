import { GET_DANCER_CLASSES } from "./actionTypes";

const defaultState = [];

export function dancerClassesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DANCER_CLASSES:
      return action.dancerClassesArr;
    default:
      return state;
  }
}
