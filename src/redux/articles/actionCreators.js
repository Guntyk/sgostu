import { GET_ARTICLES, GET_ARTICLE } from "./actionTypes";

export function getArticlesAction(articlesArr) {
  return { type: GET_ARTICLES, articlesArr };
}
