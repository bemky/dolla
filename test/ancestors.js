import createElement from '../src/createElement.js';
import ancestors from '../src/ancestors.js';
import {expect} from 'chai';

describe('ancestors', function () {
  it('one level', function () {
    const child = createElement('div', {id: 'a'})
    const parent = createElement('div', {id: 'aa'})
    
    expect('aa', ancestors(child).map(x => x.id))
  });
  
});