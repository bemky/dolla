export default function offsetTo(el, target) {
  const elRect = el.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  return {
    top: elRect.top - targetRect.top + window.scrollY,
    left: elRect.left - targetRect.left + window.scrollX
  };
}