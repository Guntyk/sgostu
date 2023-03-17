import { getEventsFetch } from "../../api/requests";
import { getEventsAction } from "./actionCreators";

export function getEvents() {
  return (dispatch) => {
    getEventsFetch().then(([eventsErr, events]) => {
      if (events) {
        const eventsArr = events.data
          .map((event) => {
            if (
              Date.parse(event.attributes.end) ||
              Date.parse(event.attributes.start) > Date.parse(new Date())
            ) {
              return event;
            }
          })
          .filter((event) => event !== undefined);
        dispatch(getEventsAction(eventsArr));
      } else {
        console.log(eventsErr);
        alert("Getting events error");
      }
    });
  };
}
