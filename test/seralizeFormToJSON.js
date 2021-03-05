import createElement from '../src/createElement';
import serializeFormToJSON from '../src/serializeFormToJSON';
import {expect} from 'chai';

describe('serializeFormToJSON', function () {
  it('single input', function () {
    const form = createElement('form', {
      children: [{
        tag: 'input',
        type: 'text',
        name: 'account[first_name]',
        value: 'Greg'
      }]
    })
    
    expect(serializeFormToJSON(form)).to.deep.equal({account: {first_name: 'Greg'}});
  });
});