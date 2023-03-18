import { GET_ORGANIZATIONS } from "./actionTypes";

export function getOrganizationsAction(orgsArr) {
  return { type: GET_ORGANIZATIONS, orgsArr };
}
