import { GET_ARTICLES } from './actionTypes';

const defaultState = [];

export function articlesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      const sortedNewsByPublicationDate = [...action.articlesArr].sort((a, b) => {
        const dateA = a.attributes.publicationDate
          ? new Date(a.attributes.publicationDate)
          : new Date(a.attributes.createdAt);
        const dateB = b.attributes.publicationDate
          ? new Date(b.attributes.publicationDate)
          : new Date(b.attributes.createdAt);
        return dateA - dateB;
      });
      return sortedNewsByPublicationDate;
    default:
      return state;
  }
}
