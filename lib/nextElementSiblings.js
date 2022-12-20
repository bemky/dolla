/*

Description
----
This method returns an element's following siblings.

Syntax
----
    nextElementSibling(element, filter)

Arguments
----
### `element`
An `Element`

### `filter`
A method that receives the next sibling as a paramter, and returns true or false

Return Value
----
`Array`

Example
----
    nextElementSiblings(el, sibling => {
        return sibling.tagName == "checkbox"
    })

*/

export default function nextElementSiblings (el, filter) {
  const siblings = [];
  while(el = el.nextElementSibling) {
    if(!filter || filter(el)) {
      siblings.push(el)
    }
  }
  return siblings
}