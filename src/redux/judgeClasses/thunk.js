import { getJudgeClassesAction } from "./actionCreators";
import { getJudgeClassesFetch } from "../../api/Adalo/judges";

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
