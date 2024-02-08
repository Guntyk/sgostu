import { filterEntities } from '../../../../../helpers/filterEntities';
import Search from '../../../../../materials/icons/Search';
import Button from '../../../../../common/Button/Button';
import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({
  setEntitiesList,
  dancerClasses,
  entitiesList,
  judgeClasses,
  catalogs,
  statuses,
  coaches,
  dancers,
  regions,
  loading,
  judges,
  clubs,
  search,
  setSearch,
}) {
  const language = window.localStorage.getItem('language');
  const [increase, setIncrease] = useState(false);

  const filteringArr =
    catalogs === 'dancers'
      ? dancers
      : catalogs === 'clubs'
      ? clubs
      : catalogs === 'coaches'
      ? coaches
      : catalogs === 'judges' && judges;

  function handleSearch(e) {
    e.preventDefault();
    setSearch(true);
    window.scrollTo(0, 0);

    const { name, club, danceClass, status, region, category } = e.target;

    const inputValues = [club, danceClass, status, region, category];

    const filtersValue = [
      catalogs,
      filteringArr,
      name.value?.toLowerCase().trim() || null,
      ...inputValues.map((inputValue) =>
        inputValue ? (inputValue.value === 'choose' ? null : inputValue.value) : null
      ),
    ];

    setEntitiesList(filterEntities(...filtersValue));
  }

  function handleReset() {
    const form = document.getElementById('search');

    const { name, club, danceClass, status, region, category } = form;

    if (name?.value) name.value = '';
    if (club?.value) club.value = 'choose';
    if (danceClass?.value) danceClass.value = 'choose';
    if (status?.value) status.value = 'choose';
    if (region?.value) region.value = 'choose';
    if (category?.value) category.value = 'choose';

    setSearch(false);
    setEntitiesList(filteringArr);
  }

  return (
    <div className={`container search-form ${increase ? 'increase' : ''} ${catalogs}`}>
      <form className='form' id='search' onSubmit={handleSearch}>
        <input
          className='search-input'
          placeholder={`${
            catalogs === 'dancers'
              ? language === 'en'
                ? 'Name or surname of dancer'
                : "Ім'я або прізвище танцюриста"
              : ''
          }${catalogs === 'clubs' ? (language === 'en' ? 'Name of club' : 'Назва клубу') : ''}${
            catalogs === 'coaches' ? (language === 'en' ? 'Name or surname of coach' : "Ім'я або прізвище тренера") : ''
          }${
            catalogs === 'judges' ? (language === 'en' ? 'Name or surname of judge' : "Ім'я або прізвище судді") : ''
          }`}
          name='name'
        />
        <div className={`form-inner`}>
          <div className={`form-selectors-wrapper ${increase && 'increase'}`}>
            {(catalogs === 'dancers' || catalogs === 'coaches') && (
              <select name='club' className='search-select club-select' defaultValue='choose'>
                <option className='club-option' value='choose' disabled>
                  {language === 'en' ? 'Club' : 'Клуб'}
                </option>
                {clubs.map((club) => (
                  <option className='club-option' value={club.id} key={club.id}>
                    {club['Club Name'].split('(')[0].trim()}
                  </option>
                ))}
              </select>
            )}
            {catalogs === 'dancers' && (
              <select name='danceClass' className='search-select class-select' defaultValue='choose'>
                <option className='class-option' value='choose' disabled>
                  {language === 'en' ? 'Class' : 'Клас'}
                </option>
                {dancerClasses.map((dancerClass) => (
                  <option className='class-option' value={dancerClass.id} key={dancerClass.id}>
                    {dancerClass['Class Name'].trim()}
                  </option>
                ))}
              </select>
            )}
            {catalogs === 'dancers' && (
              <select name='status' className='search-select status-select' defaultValue='choose'>
                <option className='status-option' value='choose' disabled>
                  {language === 'en' ? 'Status' : 'Статус'}
                </option>
                {statuses
                  .filter((status) => status.Name !== 'Не активний')
                  .map((status) => (
                    <option className='club-option' value={status.id} key={status.id}>
                      {status.Name.trim()}
                    </option>
                  ))}
              </select>
            )}
            {catalogs === 'clubs' && (
              <select name='region' className='search-select region-select' defaultValue='choose'>
                <option className='region-option' value='choose' disabled>
                  {language === 'en' ? 'Region' : 'Регіон'}
                </option>
                {regions.map((region) => (
                  <option className='region-option' value={region.id} key={region.id}>
                    {region['Region Name'].trim()}
                  </option>
                ))}
              </select>
            )}
            {catalogs === 'judges' && (
              <select name='category' className='search-select category-select' defaultValue='choose'>
                <option className='category-option' value='choose' disabled>
                  {language === 'en' ? 'Category' : 'Категорія'}
                </option>
                {judgeClasses.map((category) => (
                  <option className='category-option' value={category.id} key={category.id}>
                    {category.Category.trim()}
                  </option>
                ))}
              </select>
            )}
          </div>
          <Button className='btn-primary search-btn' buttonText={<Search />} type='submit' />
        </div>
      </form>
      <div className='button-wrapper'>
        {!loading && search && entitiesList.length < filteringArr.length && (
          <Button
            className='reset-filters-btn'
            buttonText={language === 'en' ? 'Reset filters' : 'Скинути фільтри'}
            onClick={handleReset}
          />
        )}
        <Button
          className={`reset-filters-btn collapse-btn ${increase && 'increase'}`}
          buttonText={
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='24'
                d='M112 184l144 144 144-144'
              />
            </svg>
          }
          onClick={() => {
            setIncrease(!increase);
          }}
        />
      </div>
    </div>
  );
}
