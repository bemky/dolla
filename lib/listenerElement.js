import createElement from './createElement.js';

/**
 * This method returns a HTMLElement with an event listener
 * 
 * @param {string} [tagName] - A String for html element
 * @param {Object} [attributes] - An Object of attributes for dolla's createElement
 * @param {string|Array<string>} listenerType - A String or Array representing the event type to listen to
 * @param {Function} listenerCallback - A function that receives an Event as a parameter
 * @returns {Element} Element
 * 
 * @example
 * listenerElement('button', {
 *     class: 'btn',
 *     content: 'Confirm'
 * }, 'click', e => {
 *     console.log(e)
 * })
 * 
 * listenerElement({
 *     class: 'btn',
 *     content: 'Confirm'
 * }, 'click', e => {
 *     console.log(e)
 * })
 */

export default function listenerElement (...args) {
    let callback = args.pop()
    let listener = args.pop()
    if (typeof listener != 'string' && !Array.isArray(listener)) {
        args = args.concat(listener)
        listener = 'click'
    }
    if (typeof args[0] != 'string') {
        args.unshift('button')
    }
    const el = createElement(...args)
    if (!Array.isArray(listener)) listener = [listener]
    listener.forEach(listener => el.addEventListener(listener, callback))
    return el
}