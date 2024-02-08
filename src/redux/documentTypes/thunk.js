import { getDocumentTypesFetch } from "../../api/Strapi/documents";
import { getDocumentTypesAction } from "./actionCreators";

export function getDocumentTypes() {
  return (dispatch) => {
    getDocumentTypesFetch().then(([documentTypesErr, documentTypes]) => {
      if (documentTypes) {
        dispatch(getDocumentTypesAction(documentTypes.data));
      } else {
        console.log(documentTypesErr);
      }
    });
  };
}
