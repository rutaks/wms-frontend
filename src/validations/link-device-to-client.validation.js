import * as Yup from 'yup';
import { containerVolume } from './validators';

export const linkDeviceToClientInitialValues = {
  containerVolume: null
};

export const linkDeviceToClientValidationSchema = Yup.object().shape({
  containerVolume
});
