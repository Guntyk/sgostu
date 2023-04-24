import { getClubsAction } from "./actionCreators";
import { getClubsFetch } from "../../api/Adalo/clubs";

export function getClubs() {
  return (dispatch) => {
    getClubsFetch().then((response) => {
      if (response) {
        dispatch(getClubsAction(response.at(-1).records.slice(1)));
      } else {
        alert("Getting dancers error");
      }
    });
  };
}
