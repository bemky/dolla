/**
 * This method calls an element's `dispatchEvent` with a custom event.
 * 
 * @param {Element} element - An Element
 * @param {string} eventName - A String representing the event type
 * @param {Object} [options] - Object passed to CustomEvent constructor. Defaults `target`, `bubbles`, `cancelable`
 * @returns {boolean} `false` if event is cancelable, and at least one of the event handlers which received event called `Event.preventDefault()`. Otherwise `true`.
 * 
 * @example
 * el.addEventListener('attachedToDOM', e => el.style.background = 'green')
 * trigger(el, 'attachedToDOM')
 */
export default function trigger(el, eventName, options) {
    options = Object.assign({
        bubbles: true,
        cancelable: true
    }, options)
    return el.dispatchEvent(new CustomEvent(eventName, options));
}