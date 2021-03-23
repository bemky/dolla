export default function replaceContents(el, ...nodes) {
  el.innerHTML = '';
  el.append(...nodes);
}