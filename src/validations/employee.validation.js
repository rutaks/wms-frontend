import * as Yup from 'yup';
import { firstName, lastName, email, gender, phoneNumber, employeeRole } from './validators';

export const employeeInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  employeeRole: null,
  profilePictureUrl: ''
};

export const employeeValidationSchema = Yup.object().shape({
  firstName,
  lastName,
  email,
  gender,
  phoneNumber,
  employeeRole
});
