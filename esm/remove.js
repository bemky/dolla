export default function remove(el) {
  if (el instanceof NodeList || el instanceof Array) {
    Array.from(el).forEach(remove);
  } else {
    el.parentNode.removeChild(el);
  }
}