import remove from './remove';
export default function replaceContents(el, ...nodes) {
  remove(el.childNodes);
  el.append(...nodes);
}