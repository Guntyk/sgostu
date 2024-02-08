export const filterEntities = (
  catalogs,
  filteringArr,
  nameValue,
  clubValue,
  classValue,
  statusValue,
  regionValue,
  categoryValue
) => {
  // Returning all entities if fields are empty
  if (!nameValue && !clubValue && !classValue && !statusValue && !regionValue && !categoryValue) {
    return filteringArr;
  }
  // Copying entities for filtering
  let list = [...filteringArr];

  // Filtering by name
  if (nameValue) {
    if (catalogs === 'dancers') {
      list = list.filter(
        (entity) =>
          entity['D Surname'].toLowerCase().includes(nameValue) || entity['D Name'].toLowerCase().includes(nameValue)
      );
    } else {
      list = list.filter((entity) =>
        (catalogs === 'clubs'
          ? entity['Club Name'].split('(')[0].trim()
          : catalogs === 'coaches'
          ? entity['Name Surname Coach']
          : catalogs === 'judges' && entity['Name Surname']
        )
          .toLowerCase()
          .includes(nameValue)
      );
    }
  }
  // Filtering by club
  if (clubValue) {
    list = list.filter((entity) => entity['Clubs ok'] && entity['Clubs ok'].includes(Number(clubValue)));
  }
  // Filtering by class
  if (classValue) {
    list = list.filter((dancer) => dancer['Dancer Class'].includes(Number(classValue)));
  }
  // Filtering by status
  if (statusValue) {
    list = list.filter((dancer) => dancer['Status'].includes(Number(statusValue)));
  }
  // Filtering by region
  if (regionValue) {
    list = list.filter((club) => club['Region Clubs'].includes(Number(regionValue)));
  }
  // Filtering by category
  if (categoryValue) {
    list = list.filter((judge) => judge['Assigned Category Judge'].includes(Number(categoryValue)));
  }

  return list;
};
