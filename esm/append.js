import createElement from './createElement.js';
export default function append(el, item, escape, context) {
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
      el.append(holder);
      return item.then(resolvedItem => {
        append(holder, resolvedItem, escape, context);
        Array.from(holder.childNodes).forEach(child => {
          if (child instanceof Element) {
            holder.insertAdjacentElement('beforebegin', child);
          } else {
            holder.insertAdjacentText('beforebegin', child.textContent);
          }
        });
        holder.parentNode.removeChild(holder);
      });
    } else if (item instanceof Element || item instanceof Node) {
      return el.append(item);
    } else if (item === null || item === undefined) {// do nothing
    } else if (typeof item == "function") {
      return append(el, item.bind(context)(el), escape, context);
    } else if (typeof item == "object") {
      return el.append(createElement(item));
    } else {
      if (escape) {
        return el.append(item);
      } else {
        const container = document.createElement('div');
        container.innerHTML = item;
        return el.append(...container.childNodes);
      }
    }
  }
}