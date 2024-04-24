/*

Description
----
This method adds a listener callback for an `Element` that is triggered when a containing target matching the selector is fired. Sets `event.delegateTarget` to the element that matches to selector, while target remains as element that fired the event.

Syntax
----
    append (element, content, [escape], [context], [method])
    append (element, content)
    append (element, content, escape)
    append (element, content, context)
    append (element, content, method)

Arguments
----
### `element`
An `Element` to add the event listener to

### `content`
A `Element`, `NodeList`, `HTMLCollection`, `Array`, `Promise`, `String` of text or html, `Object` passed to dolla's `createElement`.

### `escape` #optional
A `Boolean` directing method to escape or not escape content that is a string

### `context` #optional
The value to be passed as the `this` parameter if content is a method

### `method` #optional
A `String` stating which method of `Element` instance to use to add content. Default is `"append"`
    

Return Value
----
`undefined`

Example
----
    append(el, el2)
    append(el, [el2, el3, el4])
    append(el, el2.children)
    append(el, el2.childNodes)
    append(el, new Promise(resolve => {
        records.load().then(records => {
            resolve(records.map(record => {
                template(record)
            }))
        })
    }))
    append(el, {
        class: 'label',
        content: "Hello World"
    })
    append(el, "<span>Hello World</span>")
*/

import createElement from './createElement.js';
import insertBefore from './insertBefore.js';
import remove from './remove.js';

export default function append(el, content, escape, context, method) {
    if (!method) method = 'append'
    if (Array.isArray(content) || content instanceof NodeList || content instanceof HTMLCollection) {
        let contents = Array.from(content)
        if (method == 'prepend') contents = contents.reverse()
        contents.forEach(i => append(el, i, escape, context, method));
    } else if (escape instanceof Element) {
        let contents = Array.from(arguments).slice(1).filter(x => x instanceof Element);
        if (method == 'prepend') contents = contents.reverse()
        contents.forEach(i => append(el, i, undefined, context, method));
    } else {
        if (typeof escape != "boolean") {
            context = escape;
            escape = undefined;
        }
      
        if (content === null || content === undefined) {
                    // do nothing
        } else if (content instanceof Promise || content.then) {
            const holder = document.createElement('span');
            el[method](holder);
            const timestamp = new Date().getMilliseconds()
            return content.then(resolvedItem => {
                append(holder, resolvedItem, escape, context);
                insertBefore(holder, holder.childNodes)
                remove(holder);
            });
        } else if (content instanceof Element || content instanceof Node) {
            return el[method](content);
        } else if (typeof content == "function") {
            return append(el, content.bind(context)(el), escape, context);
        } else if (typeof content == "object") {
            return el[method](createElement(content));
        } else {
            if (escape) {
                return el[method](content);
            } else {
                const container = document.createElement('div');
                container.innerHTML = content;
                return el[method](...container.childNodes);
            }
        }
    }
}