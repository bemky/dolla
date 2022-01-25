import append from './append';
export default function prepend(el, item, escape, context) {
  return append(el, item, escape, context, 'prepend');
}