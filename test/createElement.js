import createElement from '../src/createElement';
import {expect} from 'chai';

describe('createElement', function () {
  it('div', function () {
    expect(createElement('div', {class: 'test'}).outerHTML).to.be.equal(`<div class="test"></div>`);
  });
  
  it('div with children', function () {
    expect(createElement('div', {
      children: 'Direct HTML'
    }).outerHTML).to.be.equal(`<div>Direct HTML</div>`);

    expect(createElement('div', {
      children: [{
        tag: 'span',
        children: 'Span'
      },
        'Direct HTML in Array'
      ]
    }).outerHTML).to.be.equal(`<div><span>Span</span>Direct HTML in Array</div>`);
    
    expect(createElement('div', {
      children: [
        {
          tag: 'span',
          children: ['This is span']
        }
      ]
    }).outerHTML).to.be.equal(`<div><span>This is span</span></div>`);
  });
  
  it('div with data', function () {
    const el = createElement('div', {
      data: {
        test: 11
      }
    })
    expect(el.dataset.test).to.be.equal('11');
  });
  
  it('div with style', function () {
    const el = createElement('div', {
      style: {
        display: 'none'
      }
    })
    expect(el.style.display).to.be.equal('none');
  });
  
  it('input with boolean attribute', function () {
    const el = createElement('input', {
      checked: true,
      type: 'checkbox'
    })
    expect(el.outerHTML).to.be.equal(`<input type="checkbox">`);
    expect(el.checked).to.equal(true)
  });
});