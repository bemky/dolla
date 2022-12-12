import createElement from '../src/createElement';
import replaceContents from '../src/replaceContents';
import * as assert from 'assert';

describe('replaceContents', function () {
  it('single element', function () {
    const test1 = createElement('div', {children: "test1"})
    const test2 = createElement('div', {children: "test2"})
    replaceContents(test1, test2)
    assert.equal(`<div>test2</div>`, test1.innerHTML)
  });
  
});