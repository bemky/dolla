import {setAttributes, createElement, stateAttribute} from 'dolla';
import * as assert from 'assert';

describe('setAttributes', function () {
    it('class', function () {
        assert.equal(setAttributes(document.createElement("div"), {class: 'test'}).outerHTML, `<div class="test"></div>`)
    });
  
    it('data', function () {
        const el = setAttributes(document.createElement("div"), {
            data: {
                test: 11
            }
        })
        assert.equal(el.dataset.test, '11');
    });
  
    it('style', function () {
        const el = setAttributes(document.createElement("div"), {
            style: {
                display: 'none'
            }
        })
        assert.equal(el.style.display, 'none');
    });
    
    it('style with key that is stateAttribute', function () {
        const display = stateAttribute('none')
        const el = setAttributes(document.createElement("div"), {
            style: {
                display: display
            }
        })
        assert.equal(el.style.display, 'none');
        display.set('block')
        assert.equal(el.style.display, 'block');
    });
  
    it('boolean attribute', function () {
        const el = setAttributes(document.createElement('input'), {
            checked: true,
            type: 'checkbox'
        })
        assert.equal(el.outerHTML, `<input type="checkbox">`);
        assert.equal(el.checked, true)
    
        const el2 = setAttributes(document.createElement('input'), {
            checked: false,
            type: 'checkbox'
        })
        assert.equal(el2.outerHTML, `<input type="checkbox">`);
        assert.equal(el2.checked, false)
    
        const el3 = setAttributes(document.createElement('textarea'), {
            readonly: true,
        })
        assert.equal(el3.outerHTML, `<textarea readonly=""></textarea>`);
        assert.equal(el3.readOnly, true)
    
        const el4 = setAttributes(document.createElement('textarea'), {
            readonly: false,
        })
        assert.equal(el4.outerHTML, `<textarea></textarea>`);
        assert.equal(el4.readOnly, false)
        
        const el5 = setAttributes(document.createElement('input'), {
            indeterminate: true,
            type: 'checkbox'
        })
        assert.equal(el5.indeterminate, true)

        const el6 = setAttributes(document.createElement('input'), {
            indeterminate: false,
            type: 'checkbox'
        })
        assert.equal(el6.indeterminate, false)
    });
  
    describe('children', function () {
        it('text', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                children: 'Hello World'
            }).outerHTML, `<div>Hello World</div>`);
        })
    
        it('element', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                children: createElement('span', {
                    children: 'Hello World'
                })
            }).outerHTML, `<div><span>Hello World</span></div>`);
        })
    
        it('null', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                children: createElement('span', {
                    children: null
                })
            }).outerHTML, `<div><span></span></div>`);
        })
    
        it('undefined', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                children: createElement('span', {
                    children: undefined
                })
            }).outerHTML, `<div><span></span></div>`);
        })
    
        it('object', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                children: {
                    tag: 'span',
                    children: 'Hello World'
                }
            }).outerHTML, `<div><span>Hello World</span></div>`);
        })
    
        it('NodeList', function () {
            const el = setAttributes(document.createElement("div"), {
                children: [{
                    children: 'Hello World'
                }]
            })
            assert.equal(setAttributes(document.createElement("div"), {
                children: el.childNodes
            }).outerHTML, `<div><div>Hello World</div></div>`);
        })
    
        it('HTMLCollection', function () {
            const el = setAttributes(document.createElement("div"), {
                children: [{
                    children: 'Hello World'
                }]
            })
            assert.equal(setAttributes(document.createElement("div"), {
                children: el.children
            }).outerHTML, `<div><div>Hello World</div></div>`);
        })
    
        it('array with text', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                children: ['Direct HTML', 'Hello World']
            }).outerHTML, `<div>Direct HTMLHello World</div>`);
        })
    
        it('array with null', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                children: ['Direct HTML', null]
            }).outerHTML, `<div>Direct HTML</div>`);
        })
    
        it('array with undefined', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                children: ['Direct HTML', undefined]
            }).outerHTML, `<div>Direct HTML</div>`);
        })
    
        it('array with object', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                children: [{
                    tag: 'span',
                    children: 'Span'
                },
                'Direct HTML in Array'
            ]
        }).outerHTML, `<div><span>Span</span>Direct HTML in Array</div>`);
    })
    
    it('array with element', function () {
        assert.equal(setAttributes(document.createElement("div"), {
            children: [createElement('span', {
                children: 'Span'
            })]
        }).outerHTML, `<div><span>Span</span></div>`);
    })
    
    it('promise', async function () {
        let r;
        const button = document.createElement('button')
        setAttributes(button, {
            disabled: new Promise(resolve => r = resolve)
        })
        assert.equal(button.disabled, false)
        await r(true)
        assert.equal(button.disabled, true)
    })
    
    it('StateBus', async function () {
        const isOpen = stateAttribute(false)
        const button = document.createElement('button')
        setAttributes(button, {
            disabled: isOpen
        })
        assert.equal(button.disabled, false)
        isOpen.set(true)
        assert.equal(button.disabled, true)
        
        const changingName = stateAttribute('foo')
        setAttributes(button, {
            content: changingName
        })
        changingName.set('bar')
        assert.equal(button.innerHTML, 'bar')
        
        changingName.set(null)
        assert.equal(button.innerHTML, '')
    })
})
  
describe('content alias to children', function () {
    it('text', function () {
        assert.equal(setAttributes(document.createElement("div"), {
            content: 'Hello World'
        }).outerHTML, `<div>Hello World</div>`);
    })
})
});