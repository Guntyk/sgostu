import { GET_CLUBS, MORE_CLUBS } from "./actionTypes";

export function getClubsAction(clubsArr) {
  return { type: GET_CLUBS, clubsArr };
}

// export function getMore CLUBSAction(clubsArr) {
//   return { type: MORE_CLUBS,  clubsArr };
// }
