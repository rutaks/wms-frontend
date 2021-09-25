import * as yup from 'yup';
import { description } from './validators';

export const createTaskInitialValues = {
  title: '',
  description: '',
  imgUrls: null,
  assigneeUuid: null
};

export const createTaskValidationSchema = yup.object().shape({
  description
});
