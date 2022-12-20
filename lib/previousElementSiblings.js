/*

Description
----
This method returns an element's previous siblings.

Syntax
----
    previousElementSiblings(element, filter)

Arguments
----
### `element`
An `Element`

### `filter`
A method that receives the previous sibling as a paramter, and returns true or false

Return Value
----
`Array`

Example
----
    previousElementSiblings(el, sibling => {
        return sibling.tagName == "checkbox"
    })

*/
export default function previousElementSiblings (el, filter) {
  const siblings = [];
  while(el = el.previousElementSibling) {
    if(!filter || filter(el)) {
      siblings.push(el)
    }
  }
  return siblings.reverse()
}