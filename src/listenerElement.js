import createElement from './createElement';

export default function listenerElement (...args) {
    let callback = args.pop()
    let listener = args.pop()
    if (typeof listener != 'string') {
        args = args.concat(listener)
        listener = 'click'
    }
    const el = createElement(...args)
    el.addEventListener(listener, callback)
    return el
}