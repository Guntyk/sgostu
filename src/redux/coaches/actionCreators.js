import { GET_COACHES, MORE_COACHES } from "./actionTypes";

export function getCoachesAction(coachesArr) {
  return { type: GET_COACHES, coachesArr };
}

// export function getMoreCoachesAction(coachesArr) {
//   return { type: MORE_COACHES, coachesArr };
// }
