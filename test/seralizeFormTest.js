import {createElement} from 'dolla';
import {serializeForm} from 'dolla';
import * as assert from 'assert';

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
    
    assert.deepEqual(serializeForm(form), {first_name: 'Greg'});
  });
});