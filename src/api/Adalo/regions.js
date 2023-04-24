import { adaloApi, headers } from "../requests";

// Regions
export const getRegionsFetch = () =>
  adaloApi.get("/t_6vdt8hjlwqw4abagjn501kzz4", {
    headers: headers,
  });
