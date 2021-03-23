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
exports.serializeForm = serializeForm;
exports.serializeFormToJSON = serializeFormToJSON;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

function serializeForm(form) {
    var formData = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = new FormData(form).entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var pair = _step.value;


            formData[pair[0]] = pair[1];
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return formData;
}

function bury(object) {
    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
    }

    if (keys.length == 2) {
        object[keys[0]] = keys[1];
    } else {
        var key = keys.shift();
        if (!(object[key] instanceof Object)) object[key] = {};
        bury.apply(undefined, [object[key]].concat(keys));
    }
    return object;
}

function serializeFormToJSON(form) {
    var formData = serializeForm(form);
    Object.keys(formData).forEach(function (key) {
        var keys = key.replace(']', '').split('[');
        if (keys.length > 1) {
            formData[keys.shift()] = bury.apply(undefined, [{}].concat(_toConsumableArray(keys.concat(formData[key]))));
            delete formData[key];
        }
    });
    return formData;
}