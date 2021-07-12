export default function insertBefore(anchor, el) {
  if (Array.isArray(el) || el instanceof NodeList || el instanceof HTMLCollection) {
    Array.from(el).reverse().forEach(x => {
      anchor = insertBefore(anchor, x);
    });
  } else if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
    return insertBefore(anchor[0], el);
  } else if (anchor.parentNode) {
    if (!(el instanceof Node)) {
      el = new Text(el);
    }

    anchor.parentNode.insertBefore(el, anchor);
    return el;
  } else {
    throw 'argument of insertBefore unsupported';
  }
}