import serializeForm from './serializeForm.js';
import bury from './bury.js';

/**
 * This method returns JSON of a form element's key and value pairs. This function unlike `serializeForm` allows the keys to nest keys (see usage)
 * 
 * @param {FormElement} form - A FormElement
 * @returns {Object} JSON object
 * 
 * @example
 * // HTML:
 * // <form>
 * //     <input name="user[name]">
 * //     <input name="user[email_address]">
 * //     <input name="team[is_active]">
 * // </form>
 * serializeFormToJSON(form)
 * // => {
 * //  user: {
 * //      name: 'Rod Kimble',
 * //      emailAddress: 'rod.kimble@hot-rod-productions.com'
 * //  },
 * //  team: {
 * //      is_active: true
 * //  }
 * //}
 */

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