import { getCoachFetch, getCoachesFetch } from "../../api/Adalo/coaches";
import { getCoachesAction, getSingleCoachAction } from "./actionCreators";

export function getCoaches(statuses) {
  return (dispatch) => {
    getCoachesFetch().then((response) => {
      if (response) {
        dispatch(
          getCoachesAction(
            response
              .at(-1)
              .records.slice(1)
              .filter((coach) => coach.Coach_Verify)
              .filter((coach) => statuses[0]["Сoaches"].includes(coach.id))
          )
        );
      } else {
        alert("Getting coaches error");
      }
    });
  };
}

export function getCoach(coachId) {
  return (dispatch) => {
    getCoachFetch(coachId).then((response) => {
      if (response) {
        dispatch(getSingleCoachAction(response[1]));
      }
    });
  };
}
