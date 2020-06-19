export const BOOLEAN_ATTRIBUTES = ['disabled', 'readonly', 'multiple', 'checked',
  'autobuffer', 'autoplay', 'controls', 'loop', 'selected', 'hidden',
  'scoped', 'async', 'defer', 'reversed', 'ismap', 'seemless', 'muted',
  'required', 'autofocus', 'novalidate', 'formnovalidate', 'open',
  'pubdate', 'itemscope'
]

export function createElement(tagName = 'div', options={}) {
  if(typeof tagName == 'object') {
    options = tagName
    tagName = options.tag || 'div'
  }
  const el = document.createElement(tagName)
  
  Object.keys(options).forEach(key => {
    const value = options[key];
    
    if(BOOLEAN_ATTRIBUTES.includes(key)){
      if(value !== false) {
        return el[key] = true;
      }
    }
    
    switch(key){
    case 'tag':
      return
    case 'value':
      return el.value = value
    case 'data':
      if(typeof value == 'object') {
        return Object.keys(value).forEach(key => {
          el.dataset[key] = JSON.stringify(value[key])
        })
      }
      break;
    case 'style':
      if(typeof value == 'object') {
        return Object.keys(value).forEach(key => {
          el.style[key] = value[key]
        })
      }
      break;
    case 'children':
      value.forEach(child => {
        if(child instanceof Element) {
          el.appendChild(child)
        } else if (typeof child == "object" && child !== null && !Array.isArray(child)) {
          el.append(createElement(child))
        } else {
          const tmp = document.createElement('div')
          tmp.innerHTML = child
          tmp.childNodes.forEach(node => el.append(node.cloneNode(true)))
        }
      })
      return
    }
    
    el.setAttribute(key, value);
  });
  return el
}

export function offset(el){
    var rect = el.getBoundingClientRect();
    return { 
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
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