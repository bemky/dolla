export default function offset (el) {
    var rect = el.getBoundingClientRect();
    return { 
      top: rect.top + el.offsetParent.scrollTop,
      left: rect.left + el.offsetParent.scrollLeft
    }
}