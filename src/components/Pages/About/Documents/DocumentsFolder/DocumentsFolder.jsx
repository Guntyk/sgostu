import { documentTypesSelector } from "../../../../../redux/documentTypes/selectors";
import { documentsSelector } from "../../../../../redux/documents/selectors";
import { getDocumentTypes } from "../../../../../redux/documentTypes/thunk";
import { getDocuments } from "../../../../../redux/documents/thunk";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Loader/Loader";
import Folder from "./Folder/Folder";
import { useEffect } from "react";
import "./DocumentsFolder.css";

export default function DocumentsFolder() {
  const documentTypes = useSelector(documentTypesSelector);
  const documents = useSelector(documentsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (documents.length === 0) {
      dispatch(getDocumentTypes());
      dispatch(getDocuments());
    }
  }, []);

  return (
    <div className="folders-wrapper">
      <div className="folders">
        {documentTypes.length !== 0 ? (
          documentTypes.map((type) => (
            <Folder type={type.attributes} typeId={type.id} key={type.id} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
