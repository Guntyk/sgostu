import { getDancerClassesFetch } from "../../api/requests";
import { getDancerClassesAction } from "./actionCreators";

export function getDancerClasses() {
  return (dispatch) => {
    getDancerClassesFetch().then((response) => {
      if (response) {
        console.log(response.at(-1).records);
        dispatch(getDancerClassesAction(response.at(-1).records));
      } else {
        alert("Getting Dancer Classes Error");
      }
    });
  };
}
