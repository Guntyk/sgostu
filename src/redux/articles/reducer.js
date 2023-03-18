import { GET_ARTICLES } from "./actionTypes";

const defaultState = [];

export function articlesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return [...action.articlesArr];
    default:
      return state;
  }
}
