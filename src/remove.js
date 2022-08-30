export default function remove(el) {
    if (el instanceof NodeList || el instanceof Array || el instanceof HTMLCollection) {
        el = Array.from(el)
        el.forEach(remove);
    } else {
        el.parentNode.removeChild(el);
    }
    return el
}