import { GET_MANAGEMENT } from "./actionTypes";

export function getManagementAction(managementArr) {
  return { type: GET_MANAGEMENT, managementArr };
}
