export default function append(el, item, escape) {
  if (Array.isArray(item)) {
    item.forEach(i => append(el, i, escape));
  } else if (escape instanceof Element) {
    const items = Array.from(arguments).slice(1).filter(x => x instanceof Element);
    items.forEach(i => append(el, i));
  } else {
    if (item instanceof Promise) {
      const holder = document.createElement('span');
      el.append(holder);
      return item.then(resolvedItem => {
        append(holder, resolvedItem, escape);
        Array.from(holder.childNodes).forEach(child => {
          if (child instanceof Element) {
            holder.insertAdjacentElement('beforebegin', child);
          } else {
            holder.insertAdjacentText('beforebegin', child.textContent);
          }
        });
        holder.parentNode.removeChild(holder);
      });
    } else if (typeof item == "function") {
      return append(el, item(el), escape);
    } else if (typeof item == "string") {
      if (escape) {
        return el.append(item);
      } else {
        const container = document.createElement('div');
        container.innerHTML = item;
        return el.append(...container.childNodes);
      }
    } else if (item !== null && item !== undefined) {
      return el.append(item);
    }
  }
}