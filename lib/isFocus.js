/*

Description
----
This method returns if an element is focused

Syntax
----
    isFocus(element)

Arguments
----
### `element`
An `Element`

Return Value
----
`Boolean`
*/
export default function isFocus(element){
    return document.activeElement === element;
}