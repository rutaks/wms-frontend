import * as yup from 'yup';
import { description } from './validators';

export const addCommentInitialValues = {
  description: ''
};

export const addCommentValidationSchema = yup.object().shape({
  description
});
