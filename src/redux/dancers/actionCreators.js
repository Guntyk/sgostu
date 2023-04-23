import { GET_DANCERS, MORE_DANCERS, SEARCH_DANCERS } from "./actionTypes";

export function getDancersAction(dancersArr) {
  return { type: GET_DANCERS, dancersArr };
}

export function getMoreDancersAction(dancersArr) {
  return { type: MORE_DANCERS, dancersArr };
}

export function searchDancersAction(searchQuery) {
  return { type: SEARCH_DANCERS, searchQuery };
}
