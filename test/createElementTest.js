import {createElement, trigger} from 'dolla';
import * as assert from 'assert';

describe('createElement', function () {
    it('div', function () {
        assert.equal(createElement('div', {class: 'test'}).outerHTML, `<div class="test"></div>`)
    });
  
    it('div with data', function () {
        const el = createElement('div', {
            data: {
                test: 11
            }
        })
        assert.equal(el.dataset.test, '11');
    });
  
    it('div with style', function () {
        const el = createElement('div', {
            style: {
                display: 'none'
            }
        })
        assert.equal(el.style.display, 'none');
    });
  
    it('input with boolean attribute', function () {
        const el = createElement('input', {
            checked: true,
            type: 'checkbox'
        })
        assert.equal(el.outerHTML, `<input type="checkbox">`);
        assert.equal(el.checked, true)
    
        const el2 = createElement('input', {
            checked: false,
            type: 'checkbox'
        })
        assert.equal(el2.outerHTML, `<input type="checkbox">`);
        assert.equal(el2.checked, false)
    
        const el3 = createElement('textarea', {
            readonly: true,
        })
        assert.equal(el3.outerHTML, `<textarea readonly=""></textarea>`);
        assert.equal(el3.readOnly, true)

        const el4 = createElement('textarea', {
            readonly: false,
        })
        assert.equal(el4.outerHTML, `<textarea></textarea>`);
        assert.equal(el4.readOnly, false)
    });
  
    it('input with event', function () {
        let done = false
        const el = createElement('input', {
            type: 'text',
            onfocus: e => done = true
        })
        trigger(el, 'focus')
        assert.equal(done, true)
    })
  
    describe('children', function () {
        it('text', function () {
            assert.equal(createElement('div', {
                children: 'Hello World'
            }).outerHTML, `<div>Hello World</div>`);
        })
    
        it('element', function () {
            assert.equal(createElement('div', {
                children: createElement('span', {
                    children: 'Hello World'
                })
            }).outerHTML, `<div><span>Hello World</span></div>`);
        })
    
        it('null', function () {
            assert.equal(createElement('div', {
                children: createElement('span', {
                    children: null
                })
            }).outerHTML, `<div><span></span></div>`);
        })
    
        it('undefined', function () {
            assert.equal(createElement('div', {
                children: createElement('span', {
                    children: undefined
                })
            }).outerHTML, `<div><span></span></div>`);
        })
    
        it('object', function () {
            assert.equal(createElement('div', {
                children: {
                    tag: 'span',
                    children: 'Hello World'
                }
            }).outerHTML, `<div><span>Hello World</span></div>`);
        })
    
        it('NodeList', function () {
            const el = createElement({
                children: [{
                    children: 'Hello World'
                }]
            })
            assert.equal(createElement('div', {
                children: el.childNodes
            }).outerHTML, `<div><div>Hello World</div></div>`);
        })
    
        it('HTMLCollection', function () {
            const el = createElement({
                children: [{
                    children: 'Hello World'
                }]
            })
            assert.equal(createElement('div', {
                children: el.children
            }).outerHTML, `<div><div>Hello World</div></div>`);
        })
    
        it('array with text', function () {
            assert.equal(createElement('div', {
                children: ['Direct HTML', 'Hello World']
            }).outerHTML, `<div>Direct HTMLHello World</div>`);
        })
    
        it('array with null', function () {
            assert.equal(createElement('div', {
                children: ['Direct HTML', null]
            }).outerHTML, `<div>Direct HTML</div>`);
        })
    
        it('array with undefined', function () {
            assert.equal(createElement('div', {
                children: ['Direct HTML', undefined]
            }).outerHTML, `<div>Direct HTML</div>`);
        })
    
        it('array with object', function () {
            assert.equal(createElement('div', {
                children: [
                    {
                        tag: 'span',
                        children: 'Span'
                    },
                    'Direct HTML in Array'
                ]
            }).outerHTML, `<div><span>Span</span>Direct HTML in Array</div>`);
        })
    
        it('array with element', function () {
            assert.equal(createElement('div', {
                children: [createElement('span', {
                    children: 'Span'
                })]
            }).outerHTML, `<div><span>Span</span></div>`);
        })
    })
    
    describe('content alias to children', function () {
        it('text', function () {
            assert.equal(createElement('div', {
                content: 'Hello World'
            }).outerHTML, `<div>Hello World</div>`);
        })
    })
  
    describe('svg', function () {
        it('xmlns', function () {
            const svg = createElement('svg', {
                viewBox: "0 0 100 100",
                content: {
                    tag: 'rect',
                    x: 0,
                    y: 0
                }
            })
            assert.equal(svg.outerHTML, `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0"></rect></svg>`);
            assert.equal(svg.children.item(0).namespaceURI, 'http://www.w3.org/2000/svg')
        })
    });
})