import createElement from '../lib/createElement.js';
import prepend from '../lib/prepend.js';
import * as assert from 'assert';

describe('prepend', function () {
  it('single element', function () {
    const el = createElement('div', {id: 'a'})
    prepend(el, createElement('div', {id: 'b'}))
    prepend(el, createElement('div', {id: 'c'}))
    assert.equal(el.outerHTML, `<div id="a"><div id="c"></div><div id="b"></div></div>`)
  });
  
});