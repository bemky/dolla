/*

Description
----
Clones an element and its ancestor chain up to and including the first ancestor that matches the given selector. Optionally includes siblings of each cloned ancestor.

Syntax
----
    cloneUp(element, selector)
    cloneUp(element, selector, options)

Arguments
----
### `element`
An `Element` to start cloning from

### `selector`
A `String` CSS selector that determines where to stop cloning ancestors

### `options`
An `Object` with optional configuration:
- `siblings.exclude`: A CSS selector string to exclude matching sibling elements from being cloned

Return Value
----
`Element` - The cloned element with its ancestor chain

*/
export default function cloneUp (el, selector, options={}) {
    const clone = el.cloneNode()
    
    if (el.matches(selector)) {
        return clone
    }
    
    if (!el.parentElement) {
        return clone
    }
    
    const parentClone = cloneUp(el.parentElement, selector)
    const shouldExclude = (node) => 
        options.siblings?.exclude && 
        node instanceof Element && 
        node.matches(options.siblings.exclude)
    
    // Clone previous siblings
    let cursor = el.previousSibling
    while (cursor) {
        if (!shouldExclude(cursor)) {
            parentClone.prepend(cursor.cloneNode(true))
        }
        cursor = cursor.previousSibling
    }
    
    // Add current element clone
    parentClone.append(clone)
    
    // Clone next siblings
    cursor = el.nextSibling
    while (cursor) {
        if (!shouldExclude(cursor)) {
            parentClone.append(cursor.cloneNode(true))
        }
        cursor = cursor.nextSibling
    }
    
    return clone
}