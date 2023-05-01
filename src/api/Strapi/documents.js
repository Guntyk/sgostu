import { backendApi } from "../requests";

// Documents
export const getDocumentsFetch = () =>
  backendApi.get(
    "/documents?populate=*&sort=createdAt&pagination[pageSize]=50"
  );

// Document Types
export const getDocumentTypesFetch = () => backendApi.get("/document-types");
