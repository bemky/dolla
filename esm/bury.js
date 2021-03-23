export default function bury(object, ...keys) {
  if (keys.length == 2) {
    object[keys[0]] = keys[1];
  } else {
    const key = keys.shift();
    if (!(object[key] instanceof Object)) object[key] = {};
    bury(object[key], ...keys);
  }

  return object;
}