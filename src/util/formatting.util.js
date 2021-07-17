/**
 * Adds a comma after  each instance of 3 digits in string
 * @param numberVal
 */
export const numberWithCommas = (numberVal) => {
  if (typeof numberVal === 'number') {
    return numberVal?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return numberVal?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '';
  }
};

export const mapIsoCodeToFlag = (isoCode) => {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
};

export const capitalizeFirstLetter = (str) => {
  return str ? str?.charAt(0).toUpperCase() + str?.slice(1) : '';
};
