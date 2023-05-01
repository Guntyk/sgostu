import { getDancersAction, getSingleDancerAction } from "./actionCreators";
import { getDancerFetch, getDancersFetch } from "../../api/Adalo/dancers";

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

export function getDancer(dancerId) {
  return (dispatch) => {
    getDancerFetch(dancerId).then((response) => {
      if (response) {
        dispatch(getSingleDancerAction(response[1]));
      }
    });
  };
}
