import { GET_ARTICLES } from './actionTypes';

export function getArticlesAction(articlesArr) {
  return { type: GET_ARTICLES, articlesArr };
}
