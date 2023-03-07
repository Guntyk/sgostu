import { GET_DANCERS, GET_DANCER } from "./actionTypes";

export function getDancersAction(dancersArr) {
  return { type: GET_DANCERS, dancersArr };
}
