export default function offsetTo(el, target) {
    const elRect = el.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    
    return {
        top: (elRect.top + window.scrollY) - (targetRect.top + window.scrollY),
        left: (elRect.left + window.scrollX) - (targetRect.left + window.scrollX)
    };
}