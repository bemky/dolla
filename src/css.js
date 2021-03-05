export function css (el, rule) {
    return getComputedStyle(el)[rule];
}