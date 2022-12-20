/*

Description
----
This method returns if an element is empty

Syntax
----
        isEmpty(element)

Arguments
----
### `element`
An `Element`

Return Value
----
`Boolean`
*/
export default function isEmpty(element){
    return element.innerHTML === "";
}