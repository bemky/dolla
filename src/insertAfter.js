export default function insertAfter(anchor, el) {
  if (Array.isArray(el) || el instanceof NodeList || el instanceof HTMLCollection) {
    Array.from(el).forEach(x => {
      anchor = insertAfter(anchor, x);
    });
  } else if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
    return insertAfter(anchor[anchor.length - 1], el);
  } else if (anchor instanceof Element) {
    if (el instanceof Element) {
      return anchor.insertAdjacentElement('afterend', el);
    } else if (el instanceof Text) {
      anchor.insertAdjacentText('afterend', el.textContent);
      return anchor.nextSibling
    } else {
      anchor.insertAdjacentText('afterend', el);
      return anchor.nextSibling
    }
  } else if (anchor.parentNode) {
    if (el instanceof Node) {
      anchor.parentNode.insertBefore(el, anchor.nextSibling);
      return el
    } else {
      const newNode = new Text(el);
      anchor.parentNode.insertBefore(newNode, anchor.nextSibling);
      return newNode
    }
  } else {
    throw('argument of insertAfter unsupported')
  }
}