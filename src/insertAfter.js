export default function insertAfter(anchor, el) {
  if (Array.isArray(el) || el instanceof NodeList || el instanceof HTMLCollection) {
    Array.from(el).forEach(x => {
      anchor = insertAfter(anchor, x);
    });
  } else if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
    return insertAfter(anchor[anchor.length - 1], el);
  } else if (anchor.parentNode) {
    if (!(el instanceof Node)) {
      el = new Text(el);
    }
    anchor.parentNode.insertBefore(el, anchor.nextSibling);
    return el
  } else {
    throw('argument of insertAfter unsupported')
  }
}