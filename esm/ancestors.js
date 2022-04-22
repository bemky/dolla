export default function ancestors(el, selector) {
  if (selector && el.parentElement.matches(selector)) {
    return [el.parentElement];
  } else if (el.parentElement && el.parentElement.parentElement) {
    return [el.parentElement].concat(ancestors(el.parentElement, selector));
  } else if (el.parentElement) {
    return [el.parentElement];
  } else {
    return [];
  }
}