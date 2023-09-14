/*

Description
----
This method mirrors `document.createElement`, but adds the ability to include attributes and content for the initialized `Element`

Syntax
----
    createElement(tagName="div", attributes={})
    createElement(attributes)

Arguments
----
### `tagName` #optional
A `String` declaring what type of HTML tag to create

### `attributes` #optional
An `Object` whose keys are used to set attributes on the created element. All HTMLElement attributes are accepted including an additional option to define `content`

- `content`: The value of the key `content` is passed into dolla's [append](#append) method. Reference the `append()` documentation for more details about possible content values.
- `tag`: A `String` declaring the type of HTML tag, used as an alternative to the first parameter

Return Value
----
`Element`

Example
----
    createElement('table', {
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

import assignAttributes from './assignAttributes.js';

export default function createElement(tagName='div', attributes={}) {
    if (typeof tagName == 'object') {
        attributes = tagName;
        tagName = attributes.tag || 'div';
    }

    const el = document.createElement(tagName);
    assignAttributes(el, attributes)
    return el;
}