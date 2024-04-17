/*

Description
----
StateBus is a simple javascript class that hold a value and calls listener callbacks when it changes

Syntax
----
    new StateBus(value)

Constructor
----
### `value`
Initial value of attribute

Return Value
----
`StateBus`

Example
----
    const el = createElement('button')
    const isOpen = new StateBus(true)
    isOpen.addListener(v => el.disabled = v.value)

Instance Methods
----
### `get()`
Returns value

### `set(v)`
Sets state

### `addListener(callback:function)`
Add listener

### `removeListener(callback:function)`
Remove Listener

### `valueOf()`
Returns value

### `transform(transformation:function)`
Returns a new StateBus that follows changes to this StateBus, with the transformation applied to value everytime it changes

*/

export default class StateBus {
    value = null;
    listens = []
    
    constructor(v) {
        this.value = v
    }
    valueOf () {
        return this.value
    }
    get () {
        return this.value
    }
    set (v, metadata) {
        const valueWas = this.value
        if (valueWas != v) {
            this.value = v
            this.listens.forEach(callback => {
                callback(v, valueWas, metadata)
            })
        }
        return this
    }
    addListener(callback) {
        this.listens.push(callback)
    }
    removeListener(callback) {
        this.listens = this.listens.filter(x => x !== callback)
    }
    transform(transformation) {
        const spawn = new StateBus(transformation(this.value))
        this.addListener((...args) => spawn.set(transformation(...args)))
        return spawn
    }
}