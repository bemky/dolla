/*

Description
----
This method mirrors `document.createElement`, but adds the ability to include attributes and content for the initialized `Element`

Syntax
----
    createElement(tagName="div", attributes={}, namespace)
    createElement(attributes, namespace)

Arguments
----
### `tagName` #optional
A `String` declaring what type of HTML tag to create

### `attributes` #optional
An `Object` whose keys are used to set attributes on the created element. All HTMLElement attributes are accepted including an additional option to define `content`

- `content`: The value of the key `content` is passed into dolla's [append](#append) method. Reference the `append()` documentation for more details about possible content values.
- `tag`: A `String` declaring the type of HTML tag, used as an alternative to the first parameter

### `namespace` #optional
A `String` declaring the [namespaceURI](https://developer.mozilla.org/en-US/docs/Web/API/Element/namespaceURI)

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

import setAttributes from './setAttributes.js';

export default function createElement(tagName='div', attributes={}, namespace) {
    if (typeof tagName == 'object') {
        if (typeof attributes == 'string') {
            namespace = attributes
        }
        attributes = tagName;
        tagName = attributes.tag || 'div';
    }
    
    let el;
    if (tagName == "svg") {
        attributes.xmlns = attributes.xmlns || "http://www.w3.org/2000/svg"
    }
    if (attributes.xmlns || namespace) {
        el = document.createElementNS(attributes.xmlns || namespace, tagName);
    } else {
        el = document.createElement(tagName);
    }

    setAttributes(el, attributes)
    return el;
}