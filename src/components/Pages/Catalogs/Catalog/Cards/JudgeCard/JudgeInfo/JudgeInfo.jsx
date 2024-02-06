import AvatarPlaceholder from '../../../../../../../common/AvatarPlaceholder/AvatarPlaceholder';
import BackButton from '../../../../../../../common/BackButton/BackButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../../Loader/Loader';
import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import './JudgeInfo.css';

import * as statusesSlice from 'redux/features/statusesSlice';
import * as judgesSlice from 'redux/features/judgesSlice';
import { ErrorMessage } from 'common/ErrorMessage/ErrorMessage';

export default function JudgeInfo() {
  const isStatusesRequestLoading = useSelector((state) => state.statuses.isLoading);
  const statusesRequestErrors = useSelector((state) => state.statuses.errors);
  const statuses = useSelector((state) => state.statuses.statuses);

  const isJudgesRequestLoading = useSelector((state) => state.judges.isLoading);
  const judgesRequestErrors = useSelector((state) => state.judges.errors);
  const judgeClasses = useSelector((state) => state.judges.judgeClasses);
  const judges = useSelector((state) => state.judges.judges);

  const language = window.localStorage.getItem('language');

  const [judge, setJudge] = useState(null);
  const { replace } = useHistory();
  const { judgeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (statuses.length === 0) {
      dispatch(statusesSlice.getStatusesData());
    }
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      if (judges.length === 0) {
        dispatch(judgesSlice.getJudgesData(statuses));
      }
      if (judgeClasses.length === 0) {
        dispatch(judgesSlice.getJudgeClassesData());
      }
    }
  }, [statuses]);

  useEffect(() => {
    if (judges.length !== 0) {
      setJudge(judges.find(({ id }) => id === Number(judgeId)));
    }
  }, [judges]);

  useEffect(() => {
    if (judge === undefined && judges.length > 0) {
      replace('/not-found');
    }
  }, [judge]);

  return (
    <section className='judge-info'>
      <BackButton className='judge-info-back-btn' />
      {judge ? (
        <div className='judge'>
          {judge['Foto Judges']?.url ? (
            <img className='judge-avatar' src={judge['Foto Judges']?.url} alt='Аватар' />
          ) : (
            <AvatarPlaceholder className='judge-avatar' />
          )}
          <div className='judge-inner'>
            <h2 className='judge-name'>{judge['Name Surname'].trim()}</h2>
            <dl className='judge-details'>
              <div className='judge-details-wrapper'>
                <dt className='judge-city'>{language === 'en' ? 'Category:' : 'Категорія:'}</dt>
                <dd>
                  {judgeClasses
                    .filter(
                      (judgeClass) =>
                        judgeClasses.indexOf(judgeClass) + 1 === Number(judge['Assigned Category Judge'][0])
                    )[0]
                    ?.Category.trim()}
                </dd>
              </div>
              <div className='judge-details-wrapper'>
                <dt className='judge-chief'>{language === 'en' ? 'Chief judge:' : 'Головний суддя:'}</dt>
                <dd>
                  {judge['Chief Judges'][0] === 1
                    ? language === 'en'
                      ? 'Yes'
                      : 'Так'
                    : language === 'en'
                    ? 'No'
                    : 'Ні'}
                </dd>
              </div>
              <div className='judge-details-wrapper'>
                <dt className='judge-inspector'>{language === 'en' ? 'Sport inspector:' : 'Спортивний інспектор:'}</dt>
                <dd>
                  {judge['Sport Inspector'][0] === 1
                    ? language === 'en'
                      ? 'Yes'
                      : 'Так'
                    : language === 'en'
                    ? 'No'
                    : 'Ні'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      {statusesRequestErrors.length > 0 && (
        <div className='menu__logout-errors-wrapper'>
          {statusesRequestErrors.map((statusesRequestError) => (
            <ErrorMessage error={statusesRequestError} key={v4()} />
          ))}
        </div>
      )}
      {judgesRequestErrors.length > 0 && (
        <div className='menu__logout-errors-wrapper'>
          {judgesRequestErrors.map((judgesRequestError) => (
            <ErrorMessage error={judgesRequestError} key={v4()} />
          ))}
        </div>
      )}
    </section>
  );
}
