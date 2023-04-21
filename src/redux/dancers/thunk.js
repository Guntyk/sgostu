import { getDancersAction, getMoreDancersAction } from "./actionCreators";
import { getDancersAmountFetch, getDancersFetch } from "../../api/requests";

export function getDancers() {
  return (dispatch) => {
    getDancersFetch(0).then((response) => {
      if (response) {
        dispatch(getDancersAction(response.at(-1).records));
      } else {
        alert("Getting dancers error");
      }
    });
  };
}

export function getMoreDancers(offset) {
  return (dispatch) => {
    getDancersFetch(offset).then((response) => {
      if (response) {
        dispatch(getMoreDancersAction(response.at(-1).records));
      } else {
        alert("Getting More Dancers Error");
      }
    });
  };
}
