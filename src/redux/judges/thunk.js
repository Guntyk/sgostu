import { getJudgesAction, getMoreJudgesAction } from "./actionCreators";
import { getJudgesFetch } from "../../api/requests";

export function getJudges(offset) {
  return (dispatch) => {
    getJudgesFetch(`?offset=${offset}`).then((response) => {
      if (response) {
        console.log(response.at(-1).records);
        dispatch(getJudgesAction(response.at(-1).records));
      } else {
        alert("Getting Judges error");
      }
    });
  };
}

// export function getMoreJudges(offset) {
//   return (dispatch) => {
//     getJudgesFetch(`?offset=${offset}`).then((response) => {
//       if (response) {
//         console.log(response);
//         dispatch(getMoreJudgesAction(response.at(-1).records.reverse()));
//       } else {
//         alert("Getting More Judges Error");
//       }
//     });
//   };
// }
