export default function insertBefore(anchor, el) {
  if (Array.isArray(el) || el instanceof NodeList || el instanceof HTMLCollection) {
    Array.from(el).reverse().forEach(x => {
      anchor = insertBefore(anchor, x)
    })
  } else if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
    insertBefore(anchor[0], el)
  } else if (anchor instanceof Element) {
    if (el instanceof Element) {
      return anchor.insertAdjacentElement('beforebegin', el);
    } else if (el instanceof Text) {
      anchor.insertAdjacentText('beforebegin', el.textContent);
      return anchor.previousSibling
    } else {
      anchor.insertAdjacentText('beforebegin', el);
      return anchor.previousSibling
    }
  } else if (anchor.parentNode) {
    if (el instanceof Node) {
      anchor.parentNode.insertBefore(el, anchor);
      return el
    } else {
      const newNode = new Text(el);
      anchor.parentNode.insertBefore(newNode, anchor);
      return newNode
    }
  } else {
    throw('argument of insertAfter unsupported')
  }
}