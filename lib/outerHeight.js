/*

Description
----
This method returns the height of an element including `margin`

Syntax
----
    outerHeight(element)

Arguments
----
### `element`
An `Element`

Return Value
----
`Integer`
*/
export default function outerHeight (el) {
    var style = getComputedStyle(el);
    return el.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
}