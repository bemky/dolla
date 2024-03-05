export default function toggleCollapse (el, show, options={}) {
    if (typeof show == "object") {
        options = show
        show = undefined
    }
    el.isCollapsed = typeof show == "boolean" ? show : el.isCollapsed != true
    if (el.isCollapsed) {
        el.style.height = (options.height || 0) + 'px'
    } else {
        el.style.overflow = "scroll"
        const height = el.scrollHeight
        el.style.removeProperty('overflow')
        el.style.height = height + 'px'
    }
    return el.isCollapsed
}