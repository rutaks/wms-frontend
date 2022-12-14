import { cloudinaryUploadPreset, cloudinaryUploadUrl } from './constants.util';

export const uploadImage = async (source) => {
  let formData = new FormData();
  formData.append('file', source);
  formData.append('upload_preset', cloudinaryUploadPreset);
  const response = await fetch(cloudinaryUploadUrl, {
    method: 'POST',
    body: formData
  });
  return await response.json();
};
