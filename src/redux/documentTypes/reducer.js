import { GET_DOCUMENT_TYPES } from "./actionTypes";

const defaultState = [];

export function documentTypesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DOCUMENT_TYPES:
      return [...action.documentTypesArr];
    default:
      return state;
  }
}
