import * as yup from 'yup';
import { description, title, assigneeUuid } from './validators';

export const createTaskInitialValues = {
  title: '',
  description: '',
  imgUrls: null,
  assigneeUuid: ''
};

export const createTaskValidationSchema = yup.object().shape({
  title,
  description,
  assigneeUuid
});
