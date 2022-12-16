import serializeForm from './serializeForm';
import bury from './bury';

export default function serializeFormToJSON (form) {
  const formData = serializeForm(form);
  Object.keys(formData).forEach(key => {
    const keys = key.replace(']', '').split('[')
    if(keys.length > 1){
      formData[keys.shift()] = bury({}, ...(keys.concat(formData[key])))
      delete formData[key];
    }
  })
  return formData;
}