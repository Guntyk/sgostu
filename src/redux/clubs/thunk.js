import { getClubsAction, getMoreClubsAction } from "./actionCreators";
import { getClubsFetch } from "../../api/requests";

export function getClubs(offset) {
  return (dispatch) => {
    getClubsFetch(`?offset=${offset}`).then((response) => {
      if (response) {
        dispatch(getClubsAction(response.at(-1).records));
      } else {
        alert("Getting dancers error");
      }
    });
  };
}

// export function getMoreDancers(offset) {
//   return (dispatch) => {
//     getDancersFetch(`?offset=${offset}`).then((response) => {
//       if (response) {
//         console.log(response);
//         dispatch(getMoreDancersAction(response.at(-1).records.reverse()));
//       } else {
//         alert("Getting More Dancers Error");
//       }
//     });
//   };
// }
