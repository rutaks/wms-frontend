import * as yup from 'yup';
import { description, email, names, phoneNumber } from './validators';

export const raiseIssueInitialValues = {
  reporterNames: '',
  reporterEmail: '',
  reporterPhone: '',
  description: ''
};

export const raiseIssueValidationSchema = yup.object().shape({
  reporterNames: names,
  reporterEmail: email,
  reporterPhone: phoneNumber,
  description
});
