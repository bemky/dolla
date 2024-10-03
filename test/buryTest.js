import {createElement} from 'dolla';
import {bury} from 'dolla';
import * as assert from 'assert';

describe('bury', function () {
  it('one level', function () {
    const test = {a: 1}
    
    assert.deepEqual({a: 1, b: 2}, bury(test, 'b', 2))
  });
  
  it('deep', function () {
    const test = {a: 1}
    
    assert.deepEqual({a: 1, b: {c: {d: 2}}}, bury(test, 'b', 'c', 'd', 2))
  });
  
  it('key collision', function () {
    const test = {a: 1}
    assert.deepEqual({a: {b: 2}}, bury(test, 'a', 'b', 2))
  })
  
  it('array', function () {
    const test = {a: 1}
    
    assert.deepEqual({a: {b: ['c', 'd']}}, bury(test, 'a', 'b', ['c', 'd']))
  });
  
  it('array index', function () {
    const test = {a: {b: [1,2,3]}}
    
    assert.deepEqual({a: {b: [1,'foo',3]}}, bury(test, 'a', 'b', 1, 'foo'))
  });
  
});