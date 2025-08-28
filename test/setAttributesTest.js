import {setAttributes, createElement} from 'dolla';
import * as assert from 'assert';

describe('setAttributes', function () {
    
    describe('class', function () {
        it('string', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                class: 'test'
            }).outerHTML, `<div class="test"></div>`)
        });
        
        it('Set', function () {
            const classes = new Set()
            classes.add('foo').add('bar')
            assert.equal(setAttributes(document.createElement("div"), {
                class: classes
            }).outerHTML, `<div class="foo bar"></div>`)
        });
        
        it('Array', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                class: ['foo', 'bar']
            }).outerHTML, `<div class="foo bar"></div>`)
        });
        
        it('Array with space separated classes', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                class: ['foo', 'bar charlie']
            }).outerHTML, `<div class="foo bar charlie"></div>`)
        });
        
        it('null', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                class: null
            }).outerHTML, `<div></div>`)
        });
        
        it('undefined', function () {
            assert.equal(setAttributes(document.createElement("div"), {
                class: undefined
            }).outerHTML, `<div></div>`)
        });
    })
  
    describe('data', function () {
        it('integer', function () {
            const el = setAttributes(document.createElement("div"), {
                data: {
                    test: 11
                }
            })
            assert.equal(el.dataset.test, '11');
        });
        it('dashed key', function () {
            const el = setAttributes(document.createElement("div"), {
                data: {
                    'key-with-dashes': 11
                }
            })
            assert.equal(el.dataset.keyWithDashes, '11');
        });
        it('camelized key', function () {
            const el = setAttributes(document.createElement("div"), {
                data: {
                    keyWithDashes: 11
                }
            })
            assert.equal(el.dataset.keyWithDashes, '11');
            assert.equal(el.getAttribute('data-key-with-dashes'), '11')
        });
        
        it('object', function () {
            const el = setAttributes(document.createElement("div"), {
                data: {
                    test: {
                        foo: {
                            bar: '11'
                        }
                    }
                }
            })
            assert.equal(el.dataset.test, JSON.stringify({foo: {bar: '11'}}));
        });
    });
    
    describe('style', function () {
        it('string', function () {
            const el = setAttributes(document.createElement("div"), {
                style: {
                    display: 'none'
                }
            })
            assert.equal(el.style.display, 'none');
        });
    
        it('null', function () {
            const el = setAttributes(document.createElement("div"), {
                style: {
                    display: null
                }
            })
            assert.equal(el.style.display, '');
        });
        
        it('Proimise', function (done) {
            let setProperty;
            const el = document.createElement("div")
            const display = new Promise(resolve => {
                setProperty = resolve
            }).finally((...args) => {
                assert.equal(el.style.display, 'block');
            }).finally(done, done)
            setAttributes(el, {
                style: {
                    display: display
                }
            })
            assert.equal(el.style.display, '');
            setProperty('block')
        })
    })
  
    
  
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
    
    it('svg attribute', function () {
        const el = setAttributes(document.createElementNS("http://www.w3.org/2000/svg", "rect"), {
            stroke: '#000',
        })
        assert.equal(el.getAttribute('stroke'), '#000')
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
})
  
describe('content alias to children', function () {
    it('text', function () {
        assert.equal(setAttributes(document.createElement("div"), {
            content: 'Hello World'
        }).outerHTML, `<div>Hello World</div>`);
    })
})
});