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
  
  it('insert single text', function () {
  });
  
  it('insert array of elements', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'c'})]})
    const el = container.querySelector('#c')
    
    insertBefore(el, [createElement('div', {id: 'a'}), createElement('div', {id: 'b'})])
    
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
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
  
});