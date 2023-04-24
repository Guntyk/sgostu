import { backendApi } from "../requests";

// Organizations
export const getOrganizationsFetch = () =>
  backendApi.get("/organizations?populate=*&fields=name");
