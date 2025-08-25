/**
 * Extends IntersectionObserver to default callback to toggle a designated class when element is stuck
 * 
 * @extends IntersectionObserver
 * @param {Object} [options={}] - Configuration options
 * @param {Element} [options.root] - Same as IntersectionObserver
 * @param {number} [options.top=1] - Pixel inset into root to determine sticky state
 * @param {number} [options.right=-9999] - Pixel inset into root to determine sticky state, default essentially removes it as a boundary
 * @param {number} [options.bottom=-9999] - Pixel inset into root to determine sticky state, default essentially removes it as a boundary
 * @param {number} [options.left=-9999] - Pixel inset into root to determine sticky state, default essentially removes it as a boundary
 * @param {string} [options.class="stuck"] - Class to toggle, when stuck, class is added
 * @returns {StuckObserver} StuckObserver instance
 * @example
 * const observer = new StuckObserver(options={})
 * const el = createElement({style: {position: 'sticky', top: 0}})
 * observer.observe(el)
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
    
    /**
     * Extends IntersectionObserver.observe to add a callback option that is called every time stuck status is changed
     * 
     * @param {HTMLElement} el - Element to observe
     * @param {Function} [callback] - Callback function that receives stuck status (true|false) as argument
     */
    observe(el, callback) {
        el.stuckCallback = callback
        return super.observe(el)
    }
}