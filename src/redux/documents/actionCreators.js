import { GET_DOCUMENTS } from "./actionTypes";

export function getDocumentsAction(documentsArr) {
  return { type: GET_DOCUMENTS, documentsArr };
}
