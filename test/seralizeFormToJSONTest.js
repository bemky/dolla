import createElement from '../lib/createElement';
import serializeFormToJSON from '../lib/serializeFormToJSON';
import * as assert from 'assert';

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
    
    assert.deepEqual(serializeFormToJSON(form), {account: {first_name: 'Greg'}});
  });
});