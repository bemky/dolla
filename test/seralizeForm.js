import createElement from '../src/createElement';
import serializeForm from '../src/serializeForm';
import {expect} from 'chai';

describe('serializeForm', function () {
  it('single input', function () {
    const form = createElement('form', {
      children: [{
        tag: 'input',
        type: 'text',
        name: 'first_name',
        value: 'Greg'
      }]
    })
    
    expect(serializeForm(form)).to.deep.equal({first_name: 'Greg'});
  });
});