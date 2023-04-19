import { getDancersAction, getMoreDancersAction } from "./actionCreators";
import { getDancersFetch } from "../../api/requests";

// const filteredStatuses = statuses.filter(
//   (status) => status.Name === ("Активний" || "Обмежений")
// );

export function getDancers(offset) {
  return (dispatch) => {
    getDancersFetch(`?offset=${offset}`).then((response) => {
      if (response) {
        console.log(response.at(-1).records);
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
