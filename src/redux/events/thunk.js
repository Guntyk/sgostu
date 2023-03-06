import { getEventsAction } from "./actionCreators";
import { getEventsFetch } from "../../api/requests";

export function getEvents() {
  return (dispatch) => {
    getEventsFetch().then((response) => {
      if (response) {
        dispatch(getEventsAction(response.at(1)));
      } else {
        alert("Getting events error");
      }
    });
  };
}
