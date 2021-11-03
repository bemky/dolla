export default function innerHeight (el) {
    var style = getComputedStyle(el);
    return el.offsetWidth - parseInt(style.paddingTop) - parseInt(style.paddingBottom);
}