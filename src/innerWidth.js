export default function innerWidth (el) {
    var style = getComputedStyle(el);
    return el.offsetWidth - parseInt(style.paddingLeft) - parseInt(style.paddingRight);
}