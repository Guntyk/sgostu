import { GET_DANCERS } from "./actionTypes";

export function getDancersAction(dancersArr) {
  return { type: GET_DANCERS, dancersArr };
}
