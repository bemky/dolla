import createElement from '../src/createElement';
import filter from '../src/filter';
import {expect} from 'chai';

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
    expect(evenNodes.map(x => x.id).join(",")).to.be.equal('n2,n4')
    
    const oddNodes = filter(el.querySelectorAll('div'), x => parseInt(x.id[1]) % 2 == 1)
    expect(oddNodes.map(x => x.id).join(",")).to.be.equal('n1,n3')
  });
  
});