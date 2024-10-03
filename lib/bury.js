/*

Description
----
Set a value of an object following a chain of nested keys.

Syntax
----
    bury(object, ...keys)

Arguments
----
### `object`
An `Object` to receive keys/value

### `keys`
An array of `Strings` to use as a chain to bury the value

Return Value
----
`object`

Example
----
    bury({foo: 1}, 'alpha', 'beta', 'charlie', 'Hello World')
    // => {
        foo: 1,
        alpha: {
            beta: {
                charlie: "Hello World"
            }
        }
    }
*/

export default function bury (object, ...keys) {
  if (keys.length == 2){
    object[keys[0]] = keys[1]
  } else {
    const key = keys.shift();
    if (!(object[key] instanceof Object)) object[key] = {}
    if (Array.isArray(object[key])) {
        object[key] = bury(Array.from(object[key]), ...keys)
    } else {
        object[key] = bury(Object.assign({}, object[key]), ...keys)
    }
  }
  return object
}