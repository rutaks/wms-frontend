import * as Yup from 'yup';

export const email = Yup.string().required('No email provided.').email('Invalid email');

export const password = Yup.string()
  .required('No password provided.')
  .min(4, 'Password is too short')
  .max(20, 'Password is too long')
  .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password is too weak!');
