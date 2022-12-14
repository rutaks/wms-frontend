export const sortOrder = (order = '') => {
  switch (order) {
    case 'ascend':
      return 'asc';
    case 'descend':
      return 'desc';
    default:
      break;
  }
};

export const taskQueryStrBuilder = (sorter, filters) => {
  let queryStr = '';
  const filterKeys = Object.keys(filters);
  for (const filterKey of filterKeys) {
    const filterKeyValues = filters[filterKey];
    if (filterKeyValues) {
      let inFilter = '';
      for (const filterKeyValue of filterKeyValues) {
        inFilter += `${filterKeyValue},`;
      }
      queryStr += `&${filterKey}__in=${inFilter}`.slice(0, -1);
    }
  }
  return queryStr;
};
