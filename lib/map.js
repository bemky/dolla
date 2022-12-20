/*

Description
----
This method returns if an element is attached to the DOM

Syntax
----
    map(elements, iteratee)

Arguments
----
### `elements`
An `Array`, `HTMLCollection`, `NodeList`

### `iteratee`
A `Function` that receives each item in elements as an argument, the return of which is set as the index of the return array

Return Value
----
`Array`

Example
----
    map(element.children, el => el.offsetHeight)
    map(element.childNodes, el => el.offsetHeight)
    map([
        el1,
        el2,
        el3
    ], el => el.offsetHeight)

*/

export default function map (elements, iteratee){
    var results = [];
    Array.from(elements).forEach((el, i) => {
      results.push(iteratee(el, i))
    })
    return results;
}