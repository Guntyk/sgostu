import { getDancersAction } from "./actionCreators";
import { getDancersFetch } from "../../api/requests";

export function getDancers() {
  return (dispatch) => {
    getDancersFetch().then((response) => {
      if (response) {
        dispatch(getDancersAction(response.at(1)));
      } else {
        alert("Getting dancers error");
      }
    });
  };
}
