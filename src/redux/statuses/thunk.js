import { getStatusesFetch } from "../../api/requests";
import { getStatusesAction } from "./actionCreators";

export function getStatuses() {
  return (dispatch) => {
    getStatusesFetch().then(([statusesErr, statuses]) => {
      if (statuses) {
        dispatch(getStatusesAction(statuses.records));
      } else {
        console.log(statusesErr);
        alert("Getting statuses error");
      }
    });
  };
}
