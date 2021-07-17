export default {
  login: { name: 'Login', url: '/login' },
  dashboard: {
    name: 'Dashboard',
    url: '/dashboard'
  },
  members: {
    name: 'Members',
    url: '/members'
  },
  addMember: {
    name: 'Add Members',
    url: '/members-add'
  },
  editMember: {
    name: 'Edit Members',
    url: `/members/:memberId/edit`
  },
  notFound: { name: '404', url: '/not-found' },
  logout: { name: 'Logout', url: '/logout' }
};
