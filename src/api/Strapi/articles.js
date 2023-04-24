import { backendApi } from "../requests";

// Articles
export const getArticlesFetch = () =>
  backendApi.get(
    "/articles?fields=title,description,type,createdAt&populate=*&sort=createdAt&pagination[pageSize]=50"
  );
