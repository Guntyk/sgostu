import { getDocumentsFetch } from "../../api/Strapi/documents";
import { getDocumentsAction } from "./actionCreators";

export function getDocuments() {
  return (dispatch) => {
    getDocumentsFetch().then(([documentsErr, documents]) => {
      if (documents) {
        dispatch(getDocumentsAction(documents.data));
      } else {
        console.log(documentsErr);
      }
    });
  };
}
