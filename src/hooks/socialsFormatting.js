export const socialsFormatting = (socialType, socialField) => {
  if (socialType === "phone") {
    if (String(socialField).slice(0, 1) === "+") {
      return socialField;
    } else if (Number(String(socialField).slice(0, 3)) === 380) {
      return `+${socialField}`;
    } else {
      return `+380${socialField}`;
    }
  } else if (socialType === "email") {
    if (socialField.includes("@")) {
      return socialField;
    }
  } else if (
    socialField.length >= 23 &&
    (socialField.includes(`https://m.${socialType}.com`) ||
      socialField.includes(`https://${socialType}.com`) ||
      socialField.includes(`https://www.${socialType}.com`) ||
      socialField.includes(`http://${socialType}.com`))
  ) {
    return socialField;
  } else if (String(socialField).includes("@") && socialField.length <= 30) {
    return socialType === "tiktok"
      ? `https://tiktok.com/${socialField}`
      : `https://${socialType}.com/${socialField.slice(1)}`;
  } else if (
    !letters
      .map((letter) => socialField.toLowerCase().includes(letter))
      .includes(true) &&
    socialField.length <= 30 &&
    (!socialField.includes(`https://m.${socialType}.com`) ||
      !socialField.includes(`https://${socialType}.com`) ||
      !socialField.includes(`https://www.${socialType}.com`) ||
      !socialField.includes(`http://${socialType}.com`))
  ) {
    return socialType === "tiktok"
      ? `https://tiktok.com/@${socialField}`
      : `https://${socialType}.com/${socialField}`;
  } else {
    return;
  }
};

export const letters = [
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ё",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ь",
  "ы",
  "ъ",
  "э",
  "ю",
  "я",
  "ї",
  "і",
  "є",
];
