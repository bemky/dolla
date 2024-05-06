/*

Description
----
Extends IntersectionObserver to default callback to toggle a desigated class when element is stuck

Syntax
----
    const observer = new StuckObserver(options={})
    const el = createElement({style: {position: 'sticky', top: 0}})
    observer.observe(el)

Constructor
----
### `options`
#### `root`
Same as [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)

#### `top`
Number | pixel inset into root to determine sticky state, default: 1

#### `right`
Number | pixel inset into root to determine sticky state, default: -9999, which essentially removes it as a boundary

#### `bottom`
Number | pixel inset into root to determine sticky state, default: -9999, which essentially removes it as a boundary

#### `left`
Number | pixel inset into root to determine sticky state, default: -9999, which essentially removes it as a boundary

#### `class`
String | class to toggle, when stuck, class is added, default: stuck

Return Value
----
`StuckObserver`


Instance Methods
----
Inherits from [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)

### `observe(el:HTMLElement, callback:Function)`
Extends [IntersectionObserver.observe](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe) to and adds a callback option that is called everytime stuck status is changed. Callback receives stuck status (true|false) as argument.

*/

export default class StuckObserver extends IntersectionObserver {
    
    constructor (options={}) {
        options = Object.assign({
            top: 1,
            right: -9999,
            bottom: -9999,
            left: -9999,
            class: 'stuck'
        }, options)
        const margin = ['top', 'right', 'bottom', 'left'].map(dir => options[dir] * -1 + "px").join(" ")
        super (entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle(options.class, entry.intersectionRatio < 1);
                if (entry.target.stuckCallback) {
                    entry.target.stuckCallback(entry.intersectionRatio < 1)
                }
            })
        }, {
            root: options.root,
            rootMargin: margin,
            threshold: 1
        })
    }
    
    observe(el, callback) {
        el.stuckCallback = callback
        return super.observe(el)
    }
}