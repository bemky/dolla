export const BOOLEAN_ATTRIBUTES = ['disabled', 'readonly', 'multiple', 'checked',
  'autobuffer', 'autoplay', 'controls', 'loop', 'selected', 'hidden',
  'scoped', 'async', 'defer', 'reversed', 'ismap', 'seemless', 'muted',
  'required', 'autofocus', 'novalidate', 'formnovalidate', 'open',
  'pubdate', 'itemscope'
]

export const HTML_ATTRIBUTES = [
  'accept','accept-charset','accesskey','action','align','allow','alt','async',
  'autocapitalize','autocomplete','autofocus','autoplay','background','bgcolor',
  'border','buffered','capture','challenge','charset','checked','cite','class',
  'code','codebase','color','cols','colspan','content','contenteditable','contextmenu',
  'controls','coords','crossorigin','csp','data','data-*','datetime','decoding',
  'default','defer','dir','dirname','disabled','download','draggable','dropzone',
  'enctype','enterkeyhint','for','form','formaction','formenctype','formmethod',
  'formnovalidate','formtarget','headers','height','hidden','high','href','hreflang',
  'http-equiv','icon','id','importance','integrity','intrinsicsize','inputmode',
  'ismap','itemprop','keytype','kind','label','lang','language','loading','list',
  'loop','low','manifest','max','maxlength','minlength','media','method','min',
  'multiple','muted','name','novalidate','open','optimum','pattern','ping','placeholder',
  'poster','preload','radiogroup','readonly','referrerpolicy','rel','required',
  'reversed','rows','rowspan','sandbox','scope','scoped','selected','shape','size',
  'sizes','slot','span','spellcheck','src','srcdoc','srclang','srcset','start',
  'step','style','summary','tabindex','target','title','translate','type','usemap',
  'value','width','wrap', 'aria', 'aria-*'
]

export function createElement(tagName = 'div', options={}) {
  if(typeof tagName == 'object') {
    options = tagName
    tagName = options.tag || 'div'
  }
  const el = document.createElement(tagName)
  
  Object.keys(options).forEach(key => {
    if(HTML_ATTRIBUTES.filter(attribute => key.match(new RegExp(attribute))).length == 0 && key != "children"){
      return
    }
    
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
          el.dataset[key] = typeof value[key] == "object" ? JSON.stringify(value[key]) : value[key]
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

export function remove (el) {
  if (el instanceof NodeList) {
    el.forEach(remove);
  } else {
    el.parentNode.removeChild(el);
  }
}
export function replaceContents(el, ...nodes) {
  el.html = '';
  el.append(...nodes);
}