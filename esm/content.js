import append from './append';
export default function (el, content) {
  el.innerHTML = '';
  return append(el, content);
}