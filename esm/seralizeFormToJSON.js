'use strict';

var expect = require('chai').expect;
var dolla = require('../dist/index');

describe('serializeFormToJSON', function () {
  it('single input', function () {
    var form = dolla.createElement('form', {
      children: [{
        tag: 'input',
        type: 'text',
        name: 'account[first_name]',
        value: 'Greg'
      }]
    });

    expect(dolla.serializeFormToJSON(form)).to.deep.equal({ account: { first_name: 'Greg' } });
  });
});