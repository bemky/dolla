export default function toElements(content) {
  if (typeof content == "function") {
    return toElements(content());
  } else if (typeof content == "string") {
    const container = document.createElement('template');
    container.innerHTML = content.trim();
    return container.content.childNodes;
  } else {
    return content;
  }
}