import { getCoachesFetch } from "../../api/Adalo/coaches";
import { getCoachesAction } from "./actionCreators";

export function getCoaches(statuses) {
  return (dispatch) => {
    getCoachesFetch().then((response) => {
      if (response) {
        dispatch(
          getCoachesAction(
            response
              .at(-1)
              .records.slice(1)
              .filter((coach) => coach["Coach Verify"])
              .filter((coach) => statuses[0]["Coaches"].includes(coach.id))
              .reverse()
          )
        );
      } else {
        alert("Getting coaches error");
      }
    });
  };
}
