/**
 * This method returns object of a form element's key and value pairs
 * 
 * @param {FormElement} form - A FormElement
 * @returns {Object} Object
 * 
 * @example
 * // HTML:
 * // <form>
 * //     <input name="user[name]" />
 * //     <input name="user[email_address]" />
 * //     <input name="team[is_active]" />
 * // </form>
 * serializeForm(form)
 * // => {
 * //  [user]name: 'Rod Kimble',
 * //  [user]emailAddress: 'rod.kimble@hot-rod-productions.com',
 * //  [team][is_active]: true
 * //}
 */

export default function serializeForm (form) {
  var formData = {};
  for(var pair of new FormData(form).entries()) {
    formData[pair[0]] = pair[1];
  }
  return formData;
}