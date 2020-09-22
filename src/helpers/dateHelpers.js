/**
 * Function that receives a malformed date and returns a properly formatted date
 * if formating fails, function returns orginal malformed date
 * @param {string} date : date with improper format
 */
export const parseDateToLocale = (date = '') => {
  try {
    const dateTimearr = date.split(' ');
    const dateArr = dateTimearr[0].split('-');
    const reformattedDate = `${dateArr[1]}-${dateArr[0]}-${dateArr[2]} ${dateTimearr[1]}`;
    return reformattedDate;
  } catch (error) {
    return date;
  }
};
