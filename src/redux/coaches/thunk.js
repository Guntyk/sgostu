import { getCoachesAction } from "./actionCreators";
import { getCoachesFetch } from "../../api/requests";

export function getCoaches() {
  return (dispatch) => {
    getCoachesFetch().then((response) => {
      if (response) {
        dispatch(getCoachesAction(response.at(-1).records.slice(1)));
      } else {
        alert("Getting coaches error");
      }
    });
  };
}
