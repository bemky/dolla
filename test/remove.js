import createElement from '../src/createElement';
import remove from '../src/remove';
import map from '../src/map';
import * as assert from 'assert';

describe('remove', function () {
  it('single element', function () {
    const child = createElement('div', {id: 'n2'})
    const el = createElement('div', {
      children: [
        { id: 'n1' },
        child,
        { id: 'n3' }
      ]
    })
    
    remove(child)
    
    assert.deepEqual( ['n1', 'n3'], map(el.childNodes, el => el.id))
  });
  
  it('multiple element', function () {
    const el = createElement('div', {
      children: [
        { id: 'n1' },
        { id: 'n2' },
        { id: 'n3' }
      ]
    })
    
    remove(el.childNodes)
    
    assert.deepEqual( [], map(el.childNodes, el => el.id))
  });
  
});