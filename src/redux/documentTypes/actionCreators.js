import { GET_DOCUMENT_TYPES } from "./actionTypes";

export function getDocumentTypesAction(documentTypesArr) {
  return { type: GET_DOCUMENT_TYPES, documentTypesArr };
}
