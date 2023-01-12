import { GET_EVENTS } from "./actionTypes";

export function getEventsAction(eventsArr) {
  return { type: GET_EVENTS, eventsArr };
}
