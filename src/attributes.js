export function hasClass (el, className) {
    var test;
    if(el.classList)
        test = el.classList.contains(className)
    else 
        test = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    return test
}
export function addClass(el, className) {
    if (el.classList){
        className.split(" ").forEach(function(className){
            el.classList.add(className);
        });
    } else 
        el.className += ' ' + className;
}
export function removeClass(el, className) {
    var removeClassFunction = function (el) {
        if (el.classList)
            className.split(" ").forEach((x) => el.classList.remove(x));
        else
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
    if (NodeList.prototype.isPrototypeOf(el))
        each(el, removeClassFunction)
    else
        removeClassFunction(el);
}

export function toggleClass(el, className, toggle) {
    if (el.classList) {
      el.classList.toggle(className, toggle);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (toggle === false || (toggle !== true && existingIndex >= 0))
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
    }
}

export function isVisible(element){
    return element.offsetParent !== null;
}

export function isFocus(element){
    return document.activeElement === element;
}

export function isEmpty(element){
    return element.innerHTML === "";
}

export function css (el, rule) {
    return getComputedStyle(el)[rule];
}