import {assignAttributes, createElement} from 'dolla';
import * as assert from 'assert';

describe('createElement', function () {
    it('class', function () {
        assert.equal(assignAttributes(document.createElement("div"), {class: 'test'}).outerHTML, `<div class="test"></div>`)
    });
  
    it('data', function () {
        const el = assignAttributes(document.createElement("div"), {
            data: {
                test: 11
            }
        })
        assert.equal(el.dataset.test, '11');
    });
  
    it('style', function () {
        const el = assignAttributes(document.createElement("div"), {
            style: {
                display: 'none'
            }
        })
        assert.equal(el.style.display, 'none');
    });
  
    it('boolean attribute', function () {
        const el = assignAttributes(document.createElement('input'), {
            checked: true,
            type: 'checkbox'
        })
        assert.equal(el.outerHTML, `<input type="checkbox">`);
        assert.equal(el.checked, true)
    
        const el2 = assignAttributes(document.createElement('input'), {
            checked: false,
            type: 'checkbox'
        })
        assert.equal(el2.outerHTML, `<input type="checkbox">`);
        assert.equal(el2.checked, false)
    
        const el3 = assignAttributes(document.createElement('textarea'), {
            readonly: true,
        })
        assert.equal(el3.outerHTML, `<textarea readonly=""></textarea>`);
        assert.equal(el3.readOnly, true)
    
        const el4 = assignAttributes(document.createElement('textarea'), {
            readonly: false,
        })
        assert.equal(el4.outerHTML, `<textarea></textarea>`);
        assert.equal(el4.readOnly, false)
    });
  
    describe('children', function () {
        it('text', function () {
            assert.equal(assignAttributes(document.createElement("div"), {
                children: 'Hello World'
            }).outerHTML, `<div>Hello World</div>`);
        })
    
        it('element', function () {
            assert.equal(assignAttributes(document.createElement("div"), {
                children: createElement('span', {
                    children: 'Hello World'
                })
            }).outerHTML, `<div><span>Hello World</span></div>`);
        })
    
        it('null', function () {
            assert.equal(assignAttributes(document.createElement("div"), {
                children: createElement('span', {
                    children: null
                })
            }).outerHTML, `<div><span></span></div>`);
        })
    
        it('undefined', function () {
            assert.equal(assignAttributes(document.createElement("div"), {
                children: createElement('span', {
                    children: undefined
                })
            }).outerHTML, `<div><span></span></div>`);
        })
    
        it('object', function () {
            assert.equal(assignAttributes(document.createElement("div"), {
                children: {
                    tag: 'span',
                    children: 'Hello World'
                }
            }).outerHTML, `<div><span>Hello World</span></div>`);
        })
    
        it('NodeList', function () {
            const el = assignAttributes(document.createElement("div"), {
                children: [{
                    children: 'Hello World'
                }]
            })
            assert.equal(assignAttributes(document.createElement("div"), {
                children: el.childNodes
            }).outerHTML, `<div><div>Hello World</div></div>`);
        })
    
        it('HTMLCollection', function () {
            const el = assignAttributes(document.createElement("div"), {
                children: [{
                    children: 'Hello World'
                }]
            })
            assert.equal(assignAttributes(document.createElement("div"), {
                children: el.children
            }).outerHTML, `<div><div>Hello World</div></div>`);
        })
    
        it('array with text', function () {
            assert.equal(assignAttributes(document.createElement("div"), {
                children: ['Direct HTML', 'Hello World']
            }).outerHTML, `<div>Direct HTMLHello World</div>`);
        })
    
        it('array with null', function () {
            assert.equal(assignAttributes(document.createElement("div"), {
                children: ['Direct HTML', null]
            }).outerHTML, `<div>Direct HTML</div>`);
        })
    
        it('array with undefined', function () {
            assert.equal(assignAttributes(document.createElement("div"), {
                children: ['Direct HTML', undefined]
            }).outerHTML, `<div>Direct HTML</div>`);
        })
    
        it('array with object', function () {
            assert.equal(assignAttributes(document.createElement("div"), {
                children: [{
                    tag: 'span',
                    children: 'Span'
                },
                'Direct HTML in Array'
            ]
        }).outerHTML, `<div><span>Span</span>Direct HTML in Array</div>`);
    })
    
    it('array with element', function () {
        assert.equal(assignAttributes(document.createElement("div"), {
            children: [createElement('span', {
                children: 'Span'
            })]
        }).outerHTML, `<div><span>Span</span></div>`);
    })
})
  
describe('content alias to children', function () {
    it('text', function () {
        assert.equal(assignAttributes(document.createElement("div"), {
            content: 'Hello World'
        }).outerHTML, `<div>Hello World</div>`);
    })
})
});