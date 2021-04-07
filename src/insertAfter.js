export default function inserAfter(anchor, el) {
  if (Array.isArray(el) || el instanceof NodeList || el instanceof HTMLCollection) {
    Array.from(el).forEach(x => {
      inserAfter(anchor, x)
      anchor = x
    })
  } else if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
    inserAfter(anchor[anchor.length - 1], el)
  } else if (el instanceof Element) {
    anchor.insertAdjacentElement('afterend', el)
  } else {
    anchor.insertAdjacentText('afterend', el)
  }
}