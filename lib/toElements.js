/**
 * This method converts a string of HTML to `Elements`
 * 
 * @param {string|Function} content - A String of HTML or a Function that returns a string of HTML
 * @returns {NodeList|Array} NodeList or Array of elements
 * 
 * @example
 * toElements("<div class='container'><label>Label</label><input type='checkbox'></div>")
 * toElements(() => "<div class='container'><label>Label</label><input type='checkbox'></div>")
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