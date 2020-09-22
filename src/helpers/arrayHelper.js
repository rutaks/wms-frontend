export const removeItem = (arr, idx) => {
  let parsedArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== idx) {
      parsedArray.push(arr[i]);
    }
  }
  return parsedArray;
};

export const getPagedItems = (currTotPages, currTotalEls) => {
  const newTotalElements = currTotalEls + 1;
  let newPage = newTotalElements / 10;
  if (newPage < currTotPages + 0.5 && newPage >= currTotPages + 0.1) {
    newPage = Math.floor(newPage) + 1;
  } else if (Math.floor(newPage) === currTotPages) {
    newPage = currTotPages;
  } else {
    newPage = Math.floor(newPage) + 1;
  }
  const newTotalPages = newPage;
  return { newTotalPages, newTotalElements };
};
