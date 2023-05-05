import { GET_COACHES } from "./actionTypes";

export function getCoachesAction(coachesArr) {
  return { type: GET_COACHES, coachesArr };
}
