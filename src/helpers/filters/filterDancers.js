export const filterDancers = (
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
  if (
    !nameValue &&
    !clubValue &&
    !classValue &&
    !statusValue &&
    !regionValue &&
    !categoryValue
  ) {
    return filteringArr;
  }
  // Copying entities for filtering
  let list = [...filteringArr];

  // Filtering by name
  if (nameValue) {
    list = list.filter((entity) =>
      (catalogs === "dancers"
        ? entity.D_Surname || entity.D_Name
        : catalogs === "clubs"
        ? entity["Club_Name"].split("(")[0].trim()
        : catalogs === "coaches"
        ? entity["Name Surname Coach"]
        : catalogs === "judges" && entity["Name Surname"]
      )
        .toLowerCase()
        .includes(nameValue)
    );
  }
  // Filtering by club
  if (clubValue) {
    list = list.filter((entity) =>
      entity[`Club${catalogs === "dancers" ? "-" : ""}`].includes(
        Number(clubValue)
      )
    );
  }
  // Filtering by class
  if (classValue) {
    list = list.filter((dancer) =>
      dancer["Dancer Class"].includes(Number(classValue))
    );
  }
  // Filtering by status
  if (statusValue) {
    list = list.filter((dancer) =>
      dancer["Status"].includes(Number(statusValue))
    );
  }
  // Filtering by region
  if (regionValue) {
    list = list.filter((club) =>
      club.Region_Clubs.includes(Number(regionValue))
    );
  }

  return list;
};
