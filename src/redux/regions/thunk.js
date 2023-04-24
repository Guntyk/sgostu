import { getRegionsFetch } from "../../api/Adalo/regions";
import { getRegionsAction } from "./actionCreators";

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
