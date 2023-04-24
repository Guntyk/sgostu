import { adaloApi, headers } from "../requests";

// Status
export const getStatusesFetch = () =>
  adaloApi.get("/t_0qa6znyf9ff60hbu7neeis31j", {
    headers: headers,
  });
