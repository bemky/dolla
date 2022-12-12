import createElement from '../src/createElement';
import nextElementSiblings from '../src/nextElementSiblings';
import * as assert from 'assert';

describe('nextElementSiblings', function () {
  it('first', function () {
    const el = createElement({id: 'a'})
    const container = createElement({
      children: [
        el, {
          id: 'b'
        }, {
          id: 'c'
        }, {
          id: 'd'
        }
      ]
    })
    
    assert.deepEqual(nextElementSiblings(el).map(x => x.id), ['b', 'c', 'd'])
  });
  
  it('middle', function () {
    const el = createElement({id: 'a'})
    const container = createElement({
      children: [
        {
          id: 'b'
        }, {
          id: 'c'
        }, {
          id: 'd'
        },
        el
      ]
    })
    
    assert.deepEqual(nextElementSiblings(el).map(x => x.id), [])
  });
  
  it('last', function () {
    const el = createElement({id: 'a'})
    const container = createElement({
      children: [
        {
          id: 'b'
        }, el , {
          id: 'c'
        }, {
          id: 'd'
        }
      ]
    })
    
    assert.deepEqual(nextElementSiblings(el).map(x => x.id), ['c', 'd'])
  });
  
});