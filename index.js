export const BOOLEAN_ATTRIBUTES = ['disabled', 'readonly', 'multiple', 'checked',
  'autobuffer', 'autoplay', 'controls', 'loop', 'selected', 'hidden',
  'scoped', 'async', 'defer', 'reversed', 'ismap', 'seemless', 'muted',
  'required', 'autofocus', 'novalidate', 'formnovalidate', 'open',
  'pubdate', 'itemscope'
]

export function createElement(tagName, options) {
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
    case 'style':
      if(typeof value == 'object') {
        return Object.keys(value).forEach(key => {
          el.style[key] = value[key]
        })
      }
    }
    
    el.setAttribute(key, value);
  });
  
  if(options.children) {
    options.children.forEach(child => {
      if(child instanceof Element || typeof child == "string") {
        el.append(child)
      } else {
        el.append(createElement(child))
      }
    })
  }
  
  return el
}