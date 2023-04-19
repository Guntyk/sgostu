import { GET_CLASSES } from "./actionTypes";

const defaultState = [];

export function classesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_CLASSES:
      return action.classesArr;
    default:
      return state;
  }
}
