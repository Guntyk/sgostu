import { documentTypesSelector } from 'redux/documentTypes/selectors';
import { documentsSelector } from 'redux/documents/selectors';
import { getDocumentTypes } from 'redux/documentTypes/thunk';
import { getDocuments } from 'redux/documents/thunk';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Loader/Loader';
import Folder from './Folder/Folder';
import { useEffect } from 'react';
import './DocumentsFolder.css';

export default function DocumentsFolder() {
  const language = window.localStorage.getItem('language');
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
    <div className='folders-wrapper'>
      <h1 className='documents-title'>{language === 'en' ? 'Documents' : 'Документи'}</h1>
      <div className='folders'>
        {documentTypes.length !== 0 ? (
          documentTypes.map(({ id, attributes }) => <Folder type={attributes} typeId={id} key={id} />)
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
