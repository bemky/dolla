import {createElement} from 'dolla';
import {prepend} from 'dolla';
import * as assert from 'assert';

describe('prepend', function () {
  it('single element', function () {
    const el = createElement('div', {id: 'a'})
    prepend(el, createElement('div', {id: 'b'}))
    prepend(el, createElement('div', {id: 'c'}))
    assert.equal(el.outerHTML, `<div id="a"><div id="c"></div><div id="b"></div></div>`)
  });
  
  it('array element', function () {
    const el = createElement('div', {id: 'a'})
    prepend(el, createElement('div', {id: 'b'}))
    prepend(el, [createElement('div', {id: 'c'}), createElement('div', {id: 'd'})])
    assert.equal(el.outerHTML, `<div id="a"><div id="c"></div><div id="d"></div><div id="b"></div></div>`)
  });
  
  it('splat elements', function () {
    const el = createElement('div', {id: 'a'})
    prepend(el, createElement('div', {id: 'b'}))
    prepend(el, createElement('div', {id: 'c'}), createElement('div', {id: 'd'}))
    assert.equal(el.outerHTML, `<div id="a"><div id="c"></div><div id="d"></div><div id="b"></div></div>`)
  });
  
});