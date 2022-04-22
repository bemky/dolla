export default function getBoundingClientRect(...els) {
    if (Array.isArray(els[0]) && els.length == 1) {
        els = els[0]
    }
    let rect = els[0].getBoundingClientRect()
    rect = {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom
    }
    els.slice(1).forEach(el => {
        const thisRect = el.getBoundingClientRect()
        if (thisRect.left < rect.left) rect.left = thisRect.left
        if (thisRect.top < rect.top) rect.top = thisRect.top
        if (thisRect.bottom > rect.bottom) rect.bottom = thisRect.bottom
        if (thisRect.right > rect.right) rect.right = thisRect.right
    })
    
    return new DOMRect(rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top)
}