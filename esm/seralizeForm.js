'use strict';

var expect = require('chai').expect;
var dolla = require('../dist/index');

describe('serializeForm', function () {
  it('single input', function () {
    var form = dolla.createElement('form', {
      children: [{
        tag: 'input',
        type: 'text',
        name: 'first_name',
        value: 'Greg'
      }]
    });

    expect(dolla.serializeForm(form)).to.deep.equal({ first_name: 'Greg' });
  });
});