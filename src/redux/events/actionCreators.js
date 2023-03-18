import { GET_EVENTS, GET_EVENT } from "./actionTypes";

export function getEventsAction(eventsArr) {
  return { type: GET_EVENTS, eventsArr };
}
