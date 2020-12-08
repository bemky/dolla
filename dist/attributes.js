'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.isVisible = isVisible;
exports.isFocus = isFocus;
exports.isEmpty = isEmpty;
exports.css = css;
function hasClass(el, className) {
    var test;
    if (el.classList) test = el.classList.contains(className);else test = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    return test;
}
function addClass(el, className) {
    if (el.classList) {
        className.split(" ").forEach(function (className) {
            el.classList.add(className);
        });
    } else el.className += ' ' + className;
}
function removeClass(el, className) {
    var removeClassFunction = function removeClassFunction(el) {
        if (el.classList) className.split(" ").forEach(function (x) {
            return el.classList.remove(x);
        });else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    };
    if (NodeList.prototype.isPrototypeOf(el)) el.forEach(removeClassFunction);else removeClassFunction(el);
}

function toggleClass(el, className, toggle) {
    if (el.classList) {
        el.classList.toggle(className, toggle);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (toggle === false || toggle !== true && existingIndex >= 0) classes.splice(existingIndex, 1);else classes.push(className);

        el.className = classes.join(' ');
    }
}

function isVisible(element) {
    return element.offsetParent !== null;
}

function isFocus(element) {
    return document.activeElement === element;
}

function isEmpty(element) {
    return element.innerHTML === "";
}

function css(el, rule) {
    return getComputedStyle(el)[rule];
}