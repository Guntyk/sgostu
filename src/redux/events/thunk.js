import { getEventsFetch } from "../../api/requests";
import { getEventsAction } from "./actionCreators";

export function fetchEvents() {
  return (dispatch) => {
    getEventsFetch().then(([eventsErr, events]) => {
      if (events) {
        dispatch(getEventsAction(events.data));
      } else {
        console.log(eventsErr);
        alert("Getting events error");
      }
    });
  };
}
