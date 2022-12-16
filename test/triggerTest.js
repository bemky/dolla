import createElement from '../lib/createElement';
import trigger from '../lib/trigger';
import * as assert from 'assert';

describe('trigger', function () {
  it('event', function (done) {
    const el = createElement()
    
    el.addEventListener('click', () => {
      assert.ok(true)
      done()
    })
    
    trigger(el, 'click')
  });
  
});