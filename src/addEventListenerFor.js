export default function addEventListenerFor (el, selector, type, listener, options) {
    el.addEventListener(type, e => {
        console.log('*****************');
        console.log(e.target.getAttribute('class'), e.target.matches(selector), selector);
        if (e.target.matches(selector) || e.target.closest(selector)) {
            listener(e)
        }
    }, options)
}