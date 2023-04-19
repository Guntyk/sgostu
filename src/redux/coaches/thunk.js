import { getCoachesAction, getMoreCoachesAction } from "./actionCreators";
import { getCoachesFetch } from "../../api/requests";

export function getCoaches(offset) {
  return (dispatch) => {
    getCoachesFetch(`?offset=${offset}`).then((response) => {
      if (response) {
        console.log(response);
        dispatch(getCoachesAction(response.at(-1).records));
      } else {
        alert("Getting coaches error");
      }
    });
  };
}

// export function getMoreCoaches(offset) {
//   return (dispatch) => {
//     getCoachesFetch(`?offset=${offset}`).then((response) => {
//       if (response) {
//         console.log(response);
//         dispatch(getMoreCoachesAction(response.at(-1).records.reverse()));
//       } else {
//         alert("Getting More Coaches Error");
//       }
//     });
//   };
// }
