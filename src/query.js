export function closest(el, selector) {
    if(el.closest) return el.closest(selector);
    while (el) {
        if (Element.prototype.matches ? el.matches(selector) : el.msMatchesSelector(selector)) {
            return el;
        }
        el = el.parentElement;
    }
}
export function ancestors(el) {
    var ancestors = [];
    el = el.parentElement;
    while (el){
        ancestors.push(el);
        el = el.parentElement;
    }
    return ancestors;
}

export function filter(nodes, predicate){
    var filteredNodes = [];
    each(nodes, function(node){
        if(predicate(node)) filteredNodes.push(node);
    });
    return filteredNodes;
}

export function map (elements, method){
    var results = [];
    for(var i=0; i < elements.length; i++){
        results.push(method(elements[i], i));
    }
    return results;
}