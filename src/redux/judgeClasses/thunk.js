import { getJudgeClassesAction } from "./actionCreators";
import { getJudgeClassesFetch } from "../../api/Adalo/judges";

export function getJudgeClasses() {
  return (dispatch) => {
    getJudgeClassesFetch().then((response) => {
      if (response) {
        dispatch(getJudgeClassesAction(response.at(-1).records));
      } else {
        alert("Getting Judge Classes Error");
      }
    });
  };
}
