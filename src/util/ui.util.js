export const getStatusColor = (status = '') => {
  if (status === 'HIGH') return 'red';
  if (status === 'MEDIUM') return 'gold';
  if (status === 'LOW') return 'green';
};

export const getActivityStatusColor = (status) => {
  switch (status) {
    case 'OPEN':
      return '#34e5eb';
    case 'REJECTED':
      return '#eb4034';
    case 'ASSIGNED':
      return '#ebb631';
    case 'ONGOING':
      return '#46eb34';
    default:
      break;
  }
};
