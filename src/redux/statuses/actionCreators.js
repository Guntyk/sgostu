import { GET_STATUSES } from "./actionTypes";

export function getStatusesAction(statusesArr) {
  return { type: GET_STATUSES, statusesArr };
}
