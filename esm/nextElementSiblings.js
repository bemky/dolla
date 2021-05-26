export default function (el, filter) {
  const siblings = [];

  while (el = el.nextElementSibling) {
    if (!filter || filter(el)) {
      siblings.push(el);
    }
  }

  return siblings;
}