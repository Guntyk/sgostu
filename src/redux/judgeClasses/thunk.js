import { getJudgeClassesFetch } from "../../api/requests";
import { getJudgeClassesAction } from "./actionCreators";

export function getJudgeClasses() {
  return (dispatch) => {
    getJudgeClassesFetch().then((response) => {
      if (response) {
        console.log(response.at(-1).records);
        dispatch(getJudgeClassesAction(response.at(-1).records));
      } else {
        alert("Getting Judge Classes Error");
      }
    });
  };
}
