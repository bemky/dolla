import createElement from '../src/createElement.js';
import append from '../src/append.js';
import insertBefore from '../src/insertBefore.js';
import * as assert from 'assert';

describe('insertBefore', function () {
    it('insert single element', function () {
        const container = createElement('div', {children: [createElement('div', {id: 'b'})]})
        const el = container.querySelector('#b')
        insertBefore(el, createElement('div', {id: 'a'}))
    
        assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div>`)
    });
  
    it('insert string', function () {
        const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
        const el = container.querySelector('#a')
        insertBefore(el, "Hello World")
        assert.equal(container.innerHTML, `Hello World<div id="a"></div>`)
    });
  
    it('insert text node', function () {
        const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
        const el = container.querySelector('#a')
        const holder = createElement('div', {children: 'Hello World'})
        insertBefore(el, holder.childNodes[0])
        assert.equal(container.innerHTML, `Hello World<div id="a"></div>`)
    });
  
    it('insert array of elements', function () {
        const container = createElement('div', {children: [createElement('div', {id: 'c'})]})
        const el = container.querySelector('#c')
    
        insertBefore(el, [createElement('div', {id: 'a'}), createElement('div', {id: 'b'})])
    
        assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
    });
  
    it('insert array of strings', function () {
        const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
        const el = container.querySelector('#a')
    
        insertBefore(el, ['Hello World', 'Test Taker'])
    
        assert.equal(container.innerHTML, `Hello WorldTest Taker<div id="a"></div>`)
    });
  
    it('insert array of text nodes', function () {
        const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
        const el = container.querySelector('#a')
        const holder = createElement('div', {id: 'DD', children: ['Hello World', createElement('div', {id: 'c'}), 'Test Taker']})
        insertBefore(el, [
            holder.childNodes[0],
            holder.childNodes[1],
            holder.childNodes[2]
        ])
        assert.equal(container.innerHTML, `Hello World<div id="c"></div>Test Taker<div id="a"></div>`)
    });
  
    it('insert NodeList', function () {
        const container = createElement('div', {children: [createElement('div', {id: 'c'})]})
        const el = container.querySelector('#c')
    
        const els = createElement('div', {
            children: [createElement('div', {id: 'a'}), createElement('div', {id: 'b'})]
        })
        insertBefore(el, els.childNodes)
    
        assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
    });
  
    it('insert HTMLCollection', function () {
        const container = createElement('div', {children: [createElement('div', {id: 'c'})]})
        const el = container.querySelector('#c')
    
        const els = createElement('div', {
            children: [createElement('div', {id: 'a'}), createElement('div', {id: 'b'})]
        })
        insertBefore(el, els.children)
    
        assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
    });
  
    it('insert single element to array', function () {
        const els = [createElement('div', {id: 'b'}), createElement('div', {id: 'c'})]
        const container = createElement('div', {children: els})
    
        insertBefore(els, createElement('div', {id: 'a'}))
        assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
    });

    it('insert single element to NodeList', function () {
        const container = createElement('div', {children: [
            createElement('div', {id: 'b'}),
            createElement('div', {id: 'c'})
        ]})
    
        insertBefore(container.childNodes, createElement('div', {id: 'a'}))
        assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
    });
  
    it('insert single element to HTMLCollection', function () {
        const container = createElement('div', {children: [
            createElement('div', {id: 'b'}),
            createElement('div', {id: 'c'})
        ]})
    
        insertBefore(container.children, createElement('div', {id: 'a'}))
        assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
    });
  
    it('insert array of elements to array of elements', function () {
        const els = [
            createElement('div', {id: 'a'}),
            createElement('div', {id: 'b'})
        ]
        const container = createElement('div', {children: els})
    
        insertBefore(els, [
            createElement('div', {id: 'c'}),
            createElement('div', {id: 'd'})
        ])
        assert.equal(container.innerHTML, `<div id="c"></div><div id="d"></div><div id="a"></div><div id="b"></div>`)
    })
  
    it('insert array of elements to array of text', function () {
        const els = [
            new Text(" "),
            createElement('div', {id: 'b'})
        ]
        const container = createElement('div', {children: els})
    
        insertBefore(els, [
            new Text(" "),
            createElement('div', {id: 'c'})
        ])
        assert.equal(container.innerHTML, ` <div id="c"></div> <div id="b"></div>`)
    })
  
    it('insert nested arrays', function () {
        const els = [
            new Text(" "),
            [
                createElement('div', {id: 'bar'})
            ],
            createElement('div', {id: 'delta'})
        ]
        const placeholder = createElement('div', {id: 'foo'})
        const container = createElement('div', {children: placeholder})
        insertBefore(placeholder, els)
        assert.equal(container.innerHTML, ` <div id="bar"></div><div id="delta"></div><div id="foo"></div>`)
    })
  
});