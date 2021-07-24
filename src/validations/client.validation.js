import * as Yup from 'yup';
import { firstName, lastName, email, gender, phoneNumber, dob } from './validators';

export const clientInitialValues = {
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  phoneNumber: '',
  dob: '',
  profilePictureUrl: ''
};

export const clientValidationSchema = Yup.object().shape({
  firstName,
  lastName,
  email,
  gender,
  phoneNumber,
  dob
});
