export default function addOutsideEventListener(el, type, callback) {
  const listener = e => {
    const rect = el.getBoundingClientRect();
    if (e.clientY < rect.top) return;
    if (e.clientY > rect.top + rect.height) return;
    if (e.clientX < rect.left) return;
    if (e.clientX > rect.left + rect.width) return;
    callback(e);
  };

  document.addEventListener(type, listener);
  return () => document.removeEventListener(type, listener);
}