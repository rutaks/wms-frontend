/**
 * Converts date object to date string format
 * Converts in the following format `YYYY-MM-DD`
 * @param {Date} date
 */
export const formatDateToString = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const getDateTickValue = (dayDiff) => {
  if (dayDiff <= 7) {
    return 'every day';
  }
  if (dayDiff <= 90) {
    return 'every week';
  }
  return 'every month';
};
