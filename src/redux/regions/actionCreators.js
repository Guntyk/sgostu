import { GET_REGIONS } from "./actionTypes";

export function getRegionsAction(regionsArr) {
  return { type: GET_REGIONS, regionsArr };
}
