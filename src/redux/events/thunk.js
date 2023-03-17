import { getEventsAction } from "./actionCreators";
import { getEventsFetch } from "../../api/requests";

export function getEvents() {
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
