/*

Description
----
Syntax sugar for `getComputedStyle`

Syntax
----
    css(element, rule)

Params
----
#### `element`
An `Element`

#### `selector`
A `String` of a valid CSS rule
    

Return Value
----
`String` representation of rule value

Usage
----
    css(el, 'width')
    >> "800px"
*/
export default function css (el, rule) {
    return getComputedStyle(el)[rule];
}