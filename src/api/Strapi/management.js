import { backendApi } from "../requests";

// Management
export const getManagementFetch = () =>
  backendApi.get(
    "/managements?populate=*&sort=createdAt&pagination[pageSize]=50"
  );
