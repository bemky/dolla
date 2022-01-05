export default function trigger(el, eventName) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, false);
  return el.dispatchEvent(event);
}