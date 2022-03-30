export default function offset (el) {
    const rect = el.getBoundingClientRect();
    const parentRect = el.offsetParent.getBoundingClientRect();
    return { 
      top: rect.top + el.offsetParent.scrollTop - parentRect.top,
      left: rect.left + el.offsetParent.scrollLeft - parentRect.left
    }
}