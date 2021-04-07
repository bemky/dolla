export default function insertBefore(anchor, el) {
  if (Array.isArray(el) || el instanceof NodeList || el instanceof HTMLCollection) {
    Array.from(el).reverse().forEach(x => {
      insertBefore(anchor, x);
      anchor = x;
    });
  } else if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
    insertBefore(anchor[0], el);
  } else if (el instanceof Element) {
    anchor.insertAdjacentElement('beforebegin', el);
  } else {
    anchor.insertAdjacentText('beforebegin', el);
  }
}