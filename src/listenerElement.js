import createElement from './createElement';

export default function listenerElement (...args) {
    let callback = args.pop()
    let listener = args.pop()
    if (typeof listener != 'string' && !Array.isArray(listener)) {
        args = args.concat(listener)
        listener = 'click'
    }
    if (args.length == 0) {
        args = ['button']
    }
    const el = createElement(...args)
    if (!Array.isArray(listener)) listener = [listener]
    listener.forEach(listener => el.addEventListener(listener, callback))
    return el
}