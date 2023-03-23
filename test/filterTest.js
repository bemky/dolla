import {createElement} from 'dolla';
import {filter} from 'dolla';
import * as assert from 'assert';

describe('filter', function () {
  it('predicate', function () {
    const el = createElement('div', {
      children: [
        {
          id: 'n1'
        }, {
          id: 'n2'
        }, {
          id: 'n3'
        }, {
          id: 'n4'
        }
      ]
    })
    
    const evenNodes = filter(el.querySelectorAll('div'), x => parseInt(x.id[1]) % 2 == 0)
    assert.equal(evenNodes.map(x => x.id).join(","), 'n2,n4')
    
    const oddNodes = filter(el.querySelectorAll('div'), x => parseInt(x.id[1]) % 2 == 1)
    assert.equal(oddNodes.map(x => x.id).join(","), 'n1,n3')
  });
  
});