import getBoundingClientRect from './getBoundingClientRect';
export default function offsetTo(el, target) {
  const elRect = getBoundingClientRect(el);
  const targetRect = target.getBoundingClientRect();
  return {
    top: elRect.top - targetRect.top,
    left: elRect.left - targetRect.left,
    right: elRect.right - targetRect.left,
    bottom: elRect.bottom - targetRect.top
  };
}