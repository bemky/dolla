/*

Description
----
This method converts a string of HTML to `Elements`

Syntax
----
    toElements(content)

Arguments
----
### `content`
A `String` of HTML or a `Function` that retuns a string of HTML

Return Value
----
`NodeList`

Example
----
    toElements("<div class='container'><label>Label</label><input type='checkbox'></div>")
    toElements(() => "<div class='container'><label>Label</label><input type='checkbox'></div>")
*/
export default async function toElements (content) {
    if (typeof content == "function") {
        return toElements(await content())
    } else if (typeof content == "string") {
        const container = document.createElement('template')
        container.innerHTML = content.trim();
        return container.content.childNodes
    } else if (!Array.isArray(content)) {
        return [content]
    } else {
        return content
    }
}