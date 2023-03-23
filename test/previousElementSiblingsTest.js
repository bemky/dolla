import {createElement} from 'dolla';
import {previousElementSiblings} from 'dolla';
import * as assert from 'assert';

describe('previousElementSiblings', function () {
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
    
    assert.deepEqual(previousElementSiblings(el).map(x => x.id), [])
  });
  
  it('middle', function () {
    const el = createElement({id: 'a'})
    const container = createElement({
      children: [
        {
          id: 'b'
        }, {
          id: 'c'
        },
        el, {
          id: 'd'
        }
      ]
    })
    
    assert.deepEqual(previousElementSiblings(el).map(x => x.id), ['b', 'c'])
  });
  
  it('last', function () {
    const el = createElement({id: 'a'})
    const container = createElement({
      children: [
        {
          id: 'b'
        } , {
          id: 'c'
        }, {
          id: 'd'
        },
        el
      ]
    })
    
    assert.deepEqual(previousElementSiblings(el).map(x => x.id), ['b', 'c', 'd'])
  });
  
});