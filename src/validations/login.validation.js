import * as yup from 'yup';
import { email, password } from './validators';

export const loginInitialValues = {
  email: '',
  password: ''
};

export const loginValidationSchema = yup.object().shape({
  email,
  password
});
