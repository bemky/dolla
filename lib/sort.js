/*

Description
----
This method will rearrange the children of an element based on a provided comparator

Syntax
----
    sort (element, compareFn)

Arguments
----
### `elements`
A `NodeList`, `HTMLCollection`, `Array` to sort

### `compareFn`
A function that returns a negative number if arg1 before arg2 or positive if after


Return Value
----
`undefined`

Example
----
    sort (els, (childA, childB) => childA.innerHeight - childB.innerHeight)
*/

                // { tag: 'img', src: '4' },
                // { tag: 'img', src: '2' },
                // { tag: 'img', src: '5' },
                // { tag: 'img', src: '1' },
                // { tag: 'img', src: '3' },


export default function sort(els, compareFn) {
    els = Array.from(els)
    for (let outerLoopIndex = 0; outerLoopIndex < els.length - 1; outerLoopIndex++) {
        let complete = true
        
        for (let innerLoopIndex = 0; innerLoopIndex < els.length - outerLoopIndex - 1; innerLoopIndex++) {
            const el = els.at(innerLoopIndex)
            const nextEl = els.at(innerLoopIndex + 1)
            if (compareFn(el, nextEl) > 0) {
                el.parentNode.insertBefore(nextEl, el)
                els.splice(innerLoopIndex + 1, 1)
                els.splice(innerLoopIndex, 0, nextEl)
                complete = false
            }
        }
        
        if (complete) break
    }
}