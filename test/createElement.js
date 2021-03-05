import createElement from '../src/createElement';
import * as assert from 'assert';

describe('createElement', function () {
  it('div', function () {
    assert.equal(createElement('div', {class: 'test'}).outerHTML, `<div class="test"></div>`)
  });
  
  it('div with children', function () {
    assert.equal(createElement('div', {
      children: 'Direct HTML'
    }).outerHTML, `<div>Direct HTML</div>`);

    assert.equal(createElement('div', {
      children: [{
        tag: 'span',
        children: 'Span'
      },
        'Direct HTML in Array'
      ]
    }).outerHTML, `<div><span>Span</span>Direct HTML in Array</div>`);
    
    assert.equal(createElement('div', {
      children: [
        {
          tag: 'span',
          children: ['This is span']
        }
      ]
    }).outerHTML, `<div><span>This is span</span></div>`);
  });
  
  it('div with data', function () {
    const el = createElement('div', {
      data: {
        test: 11
      }
    })
    assert.equal(el.dataset.test, '11');
  });
  
  it('div with style', function () {
    const el = createElement('div', {
      style: {
        display: 'none'
      }
    })
    assert.equal(el.style.display, 'none');
  });
  
  it('input with boolean attribute', function () {
    const el = createElement('input', {
      checked: true,
      type: 'checkbox'
    })
    assert.equal(el.outerHTML, `<input type="checkbox">`);
    assert.equal(el.checked, true)
  });
});