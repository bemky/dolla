export default function replaceContents(el, ...nodes) {
  el.html = '';
  el.append(...nodes);
}