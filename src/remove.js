export default function remove (el) {
  if (el instanceof NodeList) {
    Array.from(el).forEach(remove);
  } else {
    el.parentNode.removeChild(el);
  }
}