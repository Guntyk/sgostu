import { getRegionsAction } from "./actionCreators";
import { getRegionsFetch } from "../../api/requests";

export function getRegions() {
  return (dispatch) => {
    getRegionsFetch().then((response) => {
      if (response) {
        dispatch(getRegionsAction(response.at(-1).records));
      } else {
        alert("Getting regions error");
      }
    });
  };
}
