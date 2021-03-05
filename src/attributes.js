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


export function serializeForm(form) {
  var formData = {};
  for(var pair of new FormData(form).entries()) {
    
    formData[pair[0]] = pair[1];
  }
  return formData;
}

function bury(object, ...keys) {
  if(keys.length == 2){
    object[keys[0]] = keys[1]
  } else {
    const key = keys.shift();
    if(!(object[key] instanceof Object)) object[key] = {}
    bury(object[key], ...keys)
  }
  return object
}

export function serializeFormToJSON(form) {
  const formData = serializeForm(form);
  Object.keys(formData).forEach(key => {
    const keys = key.replace(']', '').split('[')
    if(keys.length > 1){
      formData[keys.shift()] = bury({}, ...(keys.concat(formData[key])))
      delete formData[key];
    }
  })
  return formData;
}