/*

Description
----
Set a value of an object following a chain of nested keys.

Syntax
----
    bury({foo: 1}, 'alpha', 'beta', 'charlie', 'Hello World')

Params
----
### `object`
An `Object` to receive keys/value

### `keys`
An array of `Strings` to use as a chain to bury the value

Return Value
----
`object`

Usage
----
    bury({foo: 1}, 'alpha', 'beta', 'charlie', 'Hello World')
    >> {
        foo: 1,
        alpha: {
            beta: {
                charlie: "Hello World"
            }
        }
    }
*/

export default function bury (object, ...keys) {
  if(keys.length == 2){
    object[keys[0]] = keys[1]
  } else {
    const key = keys.shift();
    if(!(object[key] instanceof Object)) object[key] = {}
    bury(object[key], ...keys)
  }
  return object
}