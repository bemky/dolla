import createElement from '../src/createElement.js';
import ancestors from '../src/ancestors.js';
import * as assert from 'assert';

describe('ancestors', function () {
  
  it('one level', function () {
    const child = createElement('div', {id: 'a'})
    const parent = createElement('div', {id: 'aa', children: [child]})
    
    assert.deepEqual(['aa'], ancestors(child).map(x => x.id))
  });
  
  it('none', function () {
    const child = createElement('div', {id: 'a'})
    
    assert.deepEqual([], ancestors(child).map(x => x.id))
  });
  
  it('multiple level', function () {
    const child = createElement('div', {id: 'a'})
    const parent = createElement('div', {id: 'aa', children: [child]})
    const grandparent = createElement('div', {id: 'aaa', children: [parent]})
    const greatGrandparent = createElement('div', {id: 'aaaa', children: [grandparent]})
    
    assert.deepEqual(['aa', 'aaa', 'aaaa'], ancestors(child).map(x => x.id))
  });
  
  it('multiple level with selector', function () {
    const child = createElement('div', {id: 'a'})
    const parent = createElement('div', {id: 'aa', children: [child]})
    const grandparent = createElement('div', {id: 'aaa', children: [parent], class: 'target'})
    const greatGrandparent = createElement('div', {id: 'aaaa', children: [grandparent]})
    
    assert.deepEqual(['aa', 'aaa'], ancestors(child, '.target').map(x => x.id))
  });
  
});