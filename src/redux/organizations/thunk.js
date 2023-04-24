import { getOrganizationsFetch } from "../../api/Strapi/organizations";
import { getOrganizationsAction } from "./actionCreators";

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
