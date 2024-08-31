import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { managementSelector } from 'redux/management/selectors';
import { getManagement } from 'redux/management/thunk';
import PersonInfo from './PersonCard/PersonInfo/PersonInfo';
import PersonCard from './PersonCard/PersonCard';
import Loader from 'components/Loader/Loader';
import './Management.css';

export default function Management() {
  const language = window.localStorage.getItem('language');
  const [managementType, setManagementType] = useState('council');
  const [activePerson, setActivePerson] = useState({});
  const management = useSelector(managementSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (management.length === 0) {
      dispatch(getManagement());
    }
  }, [dispatch, management.length]);

  function handleChangeType({ target: { innerText } }) {
    if (innerText === 'Рада СГОСТУ' || innerText === 'The Council of SGOSTU') {
      setManagementType('council');
    } else {
      setManagementType('regions');
    }
  }

  return (
    <div className='management'>
      <h1 className='management-title'>{language === 'en' ? 'Management' : 'Керівництво'}</h1>
      {management.length > 0 ? (
        <>
          <div className='managements-selection'>
            <button
              className={`management-type ${managementType === 'council' ? 'active' : ''}`}
              onClick={handleChangeType}
            >
              {language === 'en' ? 'The Council of SGOSTU' : 'Рада СГОСТУ'}
            </button>
            <button
              className={`management-type ${managementType === 'regions' ? 'active' : ''}`}
              onClick={handleChangeType}
            >
              {language === 'en' ? 'Regional separate subdivisions' : 'Обласні відокремлені підрозділи'}
            </button>
          </div>
          <div className='management-cards'>
            {management
              .sort((a, b) => {
                const placeA = a.attributes.place;
                const placeB = b.attributes.place;

                return placeA && placeB ? placeA - placeB : placeA ? -1 : placeB ? 1 : 0;
              })
              .filter(({ attributes: { council, regions } }) => (managementType === 'council' ? council : regions))
              .map(({ id, attributes }) => (
                <PersonCard
                  key={id}
                  personId={id}
                  person={attributes}
                  activePerson={activePerson}
                  managementType={managementType}
                  setActivePerson={setActivePerson}
                />
              ))}
          </div>
          <div className='management-detail-cards'>
            {management
              .filter(({ attributes: { council, regions } }) => (managementType === 'council' ? council : regions))
              .map(({ id, attributes }) => (
                <PersonInfo
                  key={id}
                  personId={id}
                  person={attributes}
                  activePerson={activePerson}
                  managementType={managementType}
                  setActivePerson={setActivePerson}
                />
              ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
