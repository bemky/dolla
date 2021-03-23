export default function ancestors(el) {
  var ancestors = [];
  el = el.parentElement;

  while (el) {
    ancestors.push(el);
    el = el.parentElement;
  }

  return ancestors;
}