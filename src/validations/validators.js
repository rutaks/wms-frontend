import * as Yup from 'yup';

export const isoDateRegex = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

export const email = Yup.string().required('No email provided.').email('Invalid email');

export const password = Yup.string()
  .required('No password provided.')
  .min(4, 'Password is too short')
  .max(20, 'Password is too long')
  .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password is too weak!');

export const firstName = Yup.string().required('First name is required');

export const lastName = Yup.string().required('Last name is required');

export const gender = Yup.string().oneOf(['MALE', 'FEMALE']);

export const phoneNumber = Yup.string().required('Invalid phone number');

export const dob = Yup.string()
  .typeError('Invalid date')
  .required('DOB must be entered')
  .matches(isoDateRegex, 'Invalid date');

export const containerVolume = Yup.number()
  .typeError('Invalid container volume')
  .required('Container volume is required');
