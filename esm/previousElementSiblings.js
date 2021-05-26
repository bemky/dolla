export default function (el, filter) {
  const siblings = [];

  while (el = el.previousElementSibling) {
    if (!filter || filter(el)) {
      siblings.push(el);
    }
  }

  return siblings.reverse();
}