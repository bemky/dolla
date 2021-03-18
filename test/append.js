import createElement from '../src/createElement.js';
import append from '../src/append.js';
import * as assert from 'assert';

describe('append', function () {
  it('single element', function () {
    const el = createElement('div', {id: 'a'})
    append(el, createElement('div', {id: 'b'}))
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div></div>`)
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
  
});