import createElement from '../lib/createElement';
import map from '../lib/map';
import * as assert from 'assert';

describe('map', function () {
  it('attribute', function () {
    const el = createElement('div', {
      children: [
        { id: 'n1' },
        { id: 'n2' },
        { id: 'n3' }
      ]
    })
    
    assert.deepEqual( ['n1', 'n2', 'n3'], map(el.childNodes, el => el.id))
  });
  
});