import createElement from './createElement';
import insertBefore from './insertBefore';
import remove from './remove';

export default function append(el, item, escape, context, method) {
    if (!method) method = 'append'
    if (Array.isArray(item) || item instanceof NodeList || item instanceof HTMLCollection) {
        Array.from(item).forEach(i => append(el, i, escape, context));
    } else if (escape instanceof Element) {
        const items = Array.from(arguments).slice(1).filter(x => x instanceof Element);
        items.forEach(i => append(el, i));
    } else {
        if (typeof escape != "boolean") {
            context = escape;
            escape = undefined;
        }
      
        if (item instanceof Promise) {
            const holder = document.createElement('span');
            el[method](holder);
            const timestamp = new Date().getMilliseconds()
            return item.then(resolvedItem => {
                append(holder, resolvedItem, escape, context);
                insertBefore(holder, holder.childNodes)
                remove(holder);
            });
        } else if (item instanceof Element || item instanceof Node) {
            return el[method](item);
        } else if (item === null || item === undefined) {
            // do nothing
        } else if (typeof item == "function") {
            return append(el, item.bind(context)(el), escape, context);
        } else if (typeof item == "object") {
            return el[method](createElement(item));
        } else {
            if (escape) {
                return el[method](item);
            } else {
                const container = document.createElement('div');
                container.innerHTML = item;
                return el[method](...container.childNodes);
            }
        }
    }
}