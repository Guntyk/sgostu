import { getDancerClassesFetch } from "../../api/Adalo/dancers";
import { getDancerClassesAction } from "./actionCreators";

export function getDancerClasses() {
  return (dispatch) => {
    getDancerClassesFetch().then((response) => {
      if (response) {
        dispatch(getDancerClassesAction(response.at(-1).records));
      } else {
        alert("Getting Dancer Classes Error");
      }
    });
  };
}
