import { GET_DANCERS, MORE_DANCERS, SEARCH_DANCERS } from "./actionTypes";

const defaultState = [];

export function dancersReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DANCERS:
      return action.dancersArr;
    case MORE_DANCERS:
      return [...state, ...action.dancersArr];
    case SEARCH_DANCERS:
      return state.filter(
        (dancer) =>
          dancer.D_Surname.includes(action.searchQuery) ||
          dancer.D_Name.includes(action.searchQuery)
      );
    default:
      return state;
  }
}
