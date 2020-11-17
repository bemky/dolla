export function offset(el){
    var rect = el.getBoundingClientRect();
    return { 
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    }
}

export function offsetToViewport(el){
    var rect = el.getBoundingClientRect();
    return { 
      top: rect.top,
      left: rect.left
    }
}

export function outerHeight(el){
    var height = el.offsetHeight;
    var style = getComputedStyle(el);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
}

export function outerWidth(el){
    var width = el.offsetWidth;
    var style = getComputedStyle(el);

    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
}