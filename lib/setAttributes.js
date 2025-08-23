import { BOOLEAN_ATTRIBUTES, HTML_ATTRIBUTES } from './constants.js';
import setAttribute from './setAttribute.js';
import content from './content.js';

/**
 * Assigns attributes for an `Element`
 * 
 * @param {Element} el - An Element to assign attributes to
 * @param {Object} [attributes={}] - An Object whose keys are used to set attributes on the element. All HTMLElement attributes are accepted including additional options:
 * - `content`: The value of the key `content` is passed into dolla's append method. Reference the `append()` documentation for more details about possible content values.
 * - `tag`: A String declaring the type of HTML tag, used as an alternative to the first parameter
 * @returns {Element} Element
 * 
 * @example
 * setAttributes(el, {
 *     class: 'uniformTable',
 *     cellpadding: 0,
 *     style: {
 *         verticalAlign: 'center'
 *     },
 *     content: [{
 *         tag: 'tr'
 *         content: [{
 *             tag: 'td',
 *             content: 'Hello World'
 *         }]
 *     }]
 * })
 */

export default function setAttributes(el, attributes={}) {
    Object.keys(attributes).forEach(key => setAttribute(el, key, attributes[key]));
    return el
}