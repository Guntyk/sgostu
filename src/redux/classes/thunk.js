import { getClassesFetch } from "../../api/requests";
import { getClassesAction } from "./actionCreators";

export function getClasses() {
  return (dispatch) => {
    getClassesFetch().then((response) => {
      if (response) {
        console.log(response.at(-1).records);
        dispatch(getClassesAction(response.at(-1).records));
      } else {
        alert("Getting Classes error");
      }
    });
  };
}
