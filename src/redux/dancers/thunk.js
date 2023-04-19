import { getDancersAction, getMoreDancersAction } from "./actionCreators";
import { getDancersFetch } from "../../api/requests";

export function getDancers(offset) {
  return (dispatch) => {
    getDancersFetch(`?offset=${offset}`).then((response) => {
      if (response) {
        dispatch(getDancersAction(response.at(-1).records));
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
