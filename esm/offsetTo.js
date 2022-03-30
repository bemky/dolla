export default function offsetTo(el, target) {
  const elRect = el.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  return {
    top: elRect.top - targetRect.top,
    left: elRect.left - targetRect.left
  };
}