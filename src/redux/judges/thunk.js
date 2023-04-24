import { getJudgesAction } from "./actionCreators";
import { getJudgesFetch } from "../../api/requests";

export function getJudges(statuses) {
  return (dispatch) => {
    getJudgesFetch().then((response) => {
      if (response) {
        dispatch(
          getJudgesAction(
            response
              .at(-1)
              .records.filter((judge) => judge["Judges Verify"])
              .filter((judge) =>
                statuses
                  .filter((status) => status.Name !== "Не активний")
                  .map((status) => status.Judges)
                  .flat()
                  .includes(judge.id)
              )
          )
        );
      } else {
        alert("Getting judges error");
      }
    });
  };
}
