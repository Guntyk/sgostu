import { GET_DOCUMENTS } from "./actionTypes";

const defaultState = [];

export function documentsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DOCUMENTS:
      return [...action.documentsArr];
    default:
      return state;
  }
}
