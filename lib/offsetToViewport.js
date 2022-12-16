export default function offsetToViewport (el) {
    var rect = el.getBoundingClientRect();
    return { 
      top: rect.top,
      left: rect.left
    }
}