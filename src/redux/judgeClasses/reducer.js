import { GET_JUDGE_CLASSES } from "./actionTypes";

const defaultState = [];

export function judgeClassesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_JUDGE_CLASSES:
      return action.judgeClassesArr;
    default:
      return state;
  }
}
