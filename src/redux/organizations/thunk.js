import { getOrganizationsAction } from "./actionCreators";
import { getOrganizationsFetch } from "../../api/requests";

export function getOrganizations() {
  return (dispatch) => {
    getOrganizationsFetch().then(([organizationsErr, organizations]) => {
      if (organizations) {
        dispatch(getOrganizationsAction(organizations.data));
      } else {
        console.log(organizationsErr);
        alert("Getting organizations error");
      }
    });
  };
}
