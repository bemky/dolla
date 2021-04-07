import createElement from '../src/createElement.js';
import append from '../src/append.js';
import insertAfter from '../src/insertAfter.js';
import * as assert from 'assert';

describe('insertAfter', function () {
  it('insert single element', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')
    insertAfter(el, createElement('div', {id: 'b'}))
    
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div>`)
  });
  
  it('insert single text', function () {
  });
  
  it('insert array of elements', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')
    
    insertAfter(el, [createElement('div', {id: 'b'}), createElement('div', {id: 'c'})])
    
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });
  
  it('insert NodeList', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')
    
    const els = createElement('div', {
      children: [createElement('div', {id: 'b'}), createElement('div', {id: 'c'})]
    })
    insertAfter(el, els.childNodes)
    
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });
  
  it('insert HTMLCollection', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')
    
    const els = createElement('div', {
      children: [createElement('div', {id: 'b'}), createElement('div', {id: 'c'})]
    })
    insertAfter(el, els.children)
    
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });
  
  it('insert single element to array', function () {
    const els = [createElement('div', {id: 'a'}), createElement('div', {id: 'b'})]
    const container = createElement('div', {children: els})
    
    insertAfter(els, createElement('div', {id: 'c'}))
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });

  it('insert single element to NodeList', function () {
    const container = createElement('div', {children: [
      createElement('div', {id: 'a'}),
      createElement('div', {id: 'b'})
    ]})
    
    insertAfter(container.childNodes, createElement('div', {id: 'c'}))
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });
  
  it('insert single element to HTMLCollection', function () {
    const container = createElement('div', {children: [
      createElement('div', {id: 'a'}),
      createElement('div', {id: 'b'})
    ]})
    
    insertAfter(container.children, createElement('div', {id: 'c'}))
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });
  
});