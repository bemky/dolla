var expect = require('chai').expect;
var dolla = require('../dist/index');

describe('filter', function () {
  it('predicate', function () {
    const el = dolla.createElement('div', {
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
    
    const evenNodes = dolla.filter(el.querySelectorAll('div'), x => parseInt(x.id[1]) % 2 == 0)
    expect(evenNodes.map(x => x.id).join(",")).to.be.equal('n2,n4')
    
    const oddNodes = dolla.filter(el.querySelectorAll('div'), x => parseInt(x.id[1]) % 2 == 1)
    expect(oddNodes.map(x => x.id).join(",")).to.be.equal('n1,n3')
  });
  
});