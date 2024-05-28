/*

Description
----
Assigns attributes for an `Element`

Syntax
----
    assignAttributes(el, attributes={})

Arguments
----
### `el`
An `Element` to assign attributes too

### `attributes` #optional
An `Object` whose keys are used to set attributes on the element. All HTMLElement attributes are accepted including an additional option to define `content`

- `content`: The value of the key `content` is passed into dolla's [append](#append) method. Reference the `append()` documentation for more details about possible content values.
- `tag`: A `String` declaring the type of HTML tag, used as an alternative to the first parameter

Return Value
----
`Element`

Example
----
    assignAttributes(el, {
        class: 'uniformTable',
        cellpadding: 0,
        style: {
            verticalAlign: 'center'
        },
        content: [{
            tag: 'tr'
            content: [{
                tag: 'td',
                content: 'Hello World'
            }]
        }]
    })
*/

import { BOOLEAN_ATTRIBUTES, HTML_ATTRIBUTES } from './constants.js';
import setAttribute from './setAttribute.js';
import StateBus from './StateBus.js';
import content from './content.js';

export default function setAttributes(el, attributes={}) {
    Object.keys(attributes).forEach(key => setAttribute(el, key, attributes[key]));
    return el
}