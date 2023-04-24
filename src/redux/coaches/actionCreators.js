import { GET_COACHES, GET_COACH } from "./actionTypes";

export function getCoachesAction(coachesArr) {
  return { type: GET_COACHES, coachesArr };
}

export function getSingleCoachAction(coachObj) {
  return { type: GET_COACH, coachObj };
}
