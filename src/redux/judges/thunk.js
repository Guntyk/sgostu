import { getJudgesAction } from "./actionCreators";
import { getJudgesFetch } from "../../api/requests";

export function getJudges() {
  return (dispatch) => {
    getJudgesFetch().then((response) => {
      if (response) {
        dispatch(getJudgesAction(response.at(-1).records));
      } else {
        alert("Getting Judges error");
      }
    });
  };
}
