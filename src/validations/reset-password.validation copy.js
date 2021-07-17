import * as yup from 'yup';
import { password } from './validators';

export const resetPasswordInitialValues = {
  password: ''
};

export const resetPasswordValidationSchema = yup.object().shape({
  password
});
