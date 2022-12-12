import createElement from '../src/createElement.js';
import content from '../src/content.js';
import * as assert from 'assert';

describe('content', function () {
    it('single element', function () {
        const el = createElement('div', {id: 'a', content: {id: 'b'}})
        assert.equal(el.outerHTML, `<div id="a"><div id="b"></div></div>`)
        content(el, createElement('div', {id: 'c'}))
        assert.equal(el.outerHTML, `<div id="a"><div id="c"></div></div>`)
    });
  
    it('text', function () {
        const el = createElement('div', {id: 'a', content: 'World'})
        assert.equal(el.outerHTML, `<div id="a">World</div>`)
        content(el, document.createTextNode("Hello"))
        assert.equal(el.outerHTML, `<div id="a">Hello</div>`)
    });
  
    it('null', function () {
        const el = createElement('div', {id: 'a', content: 'Hello'})
        content(el, null)
        assert.equal(el.outerHTML, `<div id="a"></div>`)
    })
  
    it('undefined', function () {
        const el = createElement('div', {id: 'a', content: 'Hello'})

        content(el, undefined)
        assert.equal(el.outerHTML, `<div id="a"></div>`)
    })
  
    it('NodeList', function () {
        const container = createElement('div', {id: 'a', content: 'This should be deleted'})
        const el = createElement({
            id: 'b',
            children: [{
                id: 'c',
                children: 'Hello World'
            }]
        })
        content(container, el.childNodes)
    
        assert.equal(container.outerHTML, `<div id="a"><div id="c">Hello World</div></div>`);
    })
  
    it('HTMLCollection', function () {
        const container = createElement('div', {id: 'a', content: 'This should be deleted'})
        const el = createElement({
            id: 'b',
            children: [{
                id: 'c',
                children: 'Hello World'
            }]
        })
        content(container, el.children)
    
        assert.equal(container.outerHTML, `<div id="a"><div id="c">Hello World</div></div>`);
    })
  
    it('object of attributes', function () {
        const el = createElement('div', {id: 'a', content: 'This should be deleted'})
        content(el, {content: 'Hello'})
        assert.equal(el.outerHTML, `<div id="a"><div>Hello</div></div>`)
    });
  
});