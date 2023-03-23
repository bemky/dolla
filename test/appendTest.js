import {createElement} from 'dolla';
import {append} from 'dolla';
import * as assert from 'assert';

describe('append', function () {
  it('single element', function () {
    const el = createElement('div', {id: 'a'})
    append(el, createElement('div', {id: 'b'}))
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div></div>`)
  });
  
  it('text', function () {
    const el = createElement('div', {id: 'a'})
    append(el, document.createTextNode("Hello"))
    assert.equal(el.outerHTML, `<div id="a">Hello</div>`)
    
    append(el, " Test")
    assert.equal(el.outerHTML, `<div id="a">Hello Test</div>`)
  });
  
  it('element', function () {
    const el = createElement('div', {id: 'a'})
    append(el, createElement('div', {id: 'b'}))
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div></div>`)
  });
  
  it('null', function () {
    const el = createElement('div', {id: 'a'})
    append(el, null)
    assert.equal(el.outerHTML, `<div id="a"></div>`)
  })
  
  it('undefined', function () {
    const el = createElement('div', {id: 'a'})

    append(el, undefined)
    assert.equal(el.outerHTML, `<div id="a"></div>`)
  })
  
  it('NodeList', function () {
    const container = createElement('div', {id: 'a'})
    const el = createElement({
      id: 'b',
      children: [{
        id: 'c',
        children: 'Hello World'
      }]
    })
    append(container, el.childNodes)
    
    assert.equal(container.outerHTML, `<div id="a"><div id="c">Hello World</div></div>`);
  })
  
  it('HTMLCollection', function () {
    const container = createElement('div', {id: 'a'})
    const el = createElement({
      id: 'b',
      children: [{
        id: 'c',
        children: 'Hello World'
      }]
    })
    append(container, el.children)
    
    assert.equal(container.outerHTML, `<div id="a"><div id="c">Hello World</div></div>`);
  })
  
  it('object of attributes', function () {
    const el = createElement('div', {id: 'a'})
    append(el, {children: 'Hello'})
    assert.equal(el.outerHTML, `<div id="a"><div>Hello</div></div>`)
  });
  
  it('array of elements', function () {
    const el = createElement('div', {id: 'a'})
    append(el, [createElement('div', {id: 'b'}), createElement('div', {id: 'c'})])
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div><div id="c"></div></div>`)
  });
  
  it('multiple element arguments', function () {
    const el = createElement('div', {id: 'a'})
    append(el, createElement('div', {id: 'b'}), createElement('div', {id: 'c'}))
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div><div id="c"></div></div>`)
  });
  
  it('escaped html', function () {
    const el = createElement('div', {id: 'a'})
    append(el, `<div id="b"></div>`, true)
    assert.equal(el.outerHTML, `<div id="a">&lt;div id="b"&gt;&lt;/div&gt;</div>`)
  })
  
  it('unescaped html', function () {
    const el = createElement('div', {id: 'a'})
    append(el, `<div id="b"></div><div id="c"></div>`)
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div><div id="c"></div></div>`)
  })
  
  it('promise', async function () {
    const el = createElement('div', {id: 'a'})
    const promise = new Promise((success) => {
      success(`<div id="b"></div><div id="c"></div>`)
    })
    await append(el, promise)
    
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div><div id="c"></div></div>`)
  })
  
  it('promise with text', async function () {
    const el = createElement('div', {id: 'a'})
    const promise = new Promise((success) => {
      success([createElement({id: 'b'}), 'Hello', document.createTextNode(' Test')])
    })
    await append(el, promise)
    
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div>Hello Test</div>`)
  })
  
  it('function', function () {
    let el = createElement('div', {id: 'a'})
    append(el, () => `<div id="b"></div><div id="c"></div>`)
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div><div id="c"></div></div>`)
    
    el = createElement('div', {id: 'a'})
    append(el, () => createElement('div', {id: 'b'}))
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div></div>`)
  })
  
  it('function with context', function () {
    const context = {id: 'b'}
    const el = createElement('div', {id: 'a'})
    append(el, function () {
      return createElement('div', {id: this.id})
    }, context)
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div></div>`)
  })
  
});