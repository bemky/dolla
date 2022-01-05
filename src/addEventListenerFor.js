export default function addEventListenerFor (el, selector, type, listener, options) {
    el.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            e.delegateTarget = e.target
            listener(e)
        } else if (e.target.closest(selector)) {
            e.delegateTarget = e.target.closest(selector)
            listener(e)
        }
    }, options)
}