/*

Description
----
Initializes StateBus with value

Syntax
----
    stateAttribute(value)

Arguments
----
### `value`
Initial value of attribute

Return Value
----
`StateBus`

Example
----
    const el = createElement('button')
    const isOpen = stateAttribute(true)
    isOpen.addListener(v => el.disabled = v.value)
*/

import StateBus from './StateBus.js';

export default function stateAttribute(value) {
    return new VariableEventBus(value)
}