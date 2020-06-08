export const BOOLEAN_ATTRIBUTES = ['disabled', 'readonly', 'multiple', 'checked',
  'autobuffer', 'autoplay', 'controls', 'loop', 'selected', 'hidden',
  'scoped', 'async', 'defer', 'reversed', 'ismap', 'seemless', 'muted',
  'required', 'autofocus', 'novalidate', 'formnovalidate', 'open',
  'pubdate', 'itemscope'
]

export function createElement(tagName, options={}) {
  const el = document.createElement(tagName)
  
  Object.keys(options).forEach(key => {
    const value = options[key];
    
    if(BOOLEAN_ATTRIBUTES.includes(key)){
      if(value !== false) {
        return el[key] = true;
      }
    }
    
    switch(key){
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
        } else if (typeof child == "string") {
          const tmp = document.createElement('div')
          tmp.innerHTML = child
          tmp.childNodes.forEach(node => el.append(node.cloneNode(true)))
        } else {
          el.append(createElement(child))
        }
      })
      return
    }
    
    el.setAttribute(key, value);
  });
  return el
}