import { getDancersFetch } from "../../api/Adalo/dancers";
import { getDancersAction } from "./actionCreators";

export function getDancers(statuses) {
  return (dispatch) => {
    getDancersFetch().then((response) => {
      if (response) {
        dispatch(
          getDancersAction(
            response
              .at(-1)
              .records.filter((dancer) => dancer["Dancer Verify"])
              .filter((dancer) =>
                statuses
                  .filter((status) => status.Name !== "Не активний")
                  .map((status) => status.Dancers)
                  .flat()
                  .includes(dancer.id)
              )
          )
        );
      } else {
        alert("Getting dancers error");
      }
    });
  };
}
