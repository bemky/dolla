/**
 * This method adds a listener callback for an `Element` that is triggered when a containing target matching the selector is fired. Sets `event.delegateTarget` to the element that matches to selector, while target remains as element that fired the event.
 * 
 * @param {Element} element - An Element to add the event listener to
 * @param {string} selector - A valid CSS selector string
 * @param {Array<string>|string} types - An Array of String or String representing the event type to listen for
 * @param {Function|Object} listener - An Object with a handleEvent() method or a function. Receives an Event as the param. Event has attribute delegateTarget added that is the element that matches the selector.
 * @param {Object} [options={}] - An Object with options for addEventListener
 * @returns {undefined}
 * 
 * @example
 * addEventListenerFor(el, 'checkbox', 'change', e => {
 *     console.log(e.delegateTarget.value)
 * }, {once: true})
 */
 
export default function addEventListenerFor (element, selector, types, listener, options={}) {
    if (!Array.isArray(types)) { types = [types]}
    types.forEach(type => {
        element.addEventListener(type, e => {
            if (e.target.matches(selector)) {
                e.delegateTarget = e.target
                listener(e)
            } else if (e.target.closest(selector)) {
                e.delegateTarget = e.target.closest(selector)
                listener(e)
            }
        }, options)
    })
}