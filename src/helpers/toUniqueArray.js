export const toUniqueArray = (arr) => {
  return arr.filter((item, pos) => arr.indexOf(item) === pos);
};
