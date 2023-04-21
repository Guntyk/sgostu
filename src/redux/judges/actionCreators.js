import { GET_JUDGES, MORE_JUDGES } from "./actionTypes";

export function getJudgesAction(judgesArr) {
  return { type: GET_JUDGES, judgesArr };
}

// export function getMoreJUDGESAction(JUDGESArr) {
//   return { type: MORE_JUDGES, JUDGESArr };
// }
