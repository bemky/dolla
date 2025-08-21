import { createElement } from 'dolla';
import { cloneNode } from 'dolla';
import * as assert from 'assert';

describe('cloneNode', function () {
    it('single level', function () {
        const el = createElement('div', {id: 'original', content: 'Hello'});
        const clone = cloneNode(el, false);
        
        assert.equal(clone.id, 'original');
        assert.equal(clone.tagName, 'DIV');
        assert.equal(clone.childNodes.length, 0);
        assert.notEqual(clone, el);
    });
  
    it('nested', function () {
        const el = createElement('div', {
            id: 'parent', 
            content: [
                createElement('span', {id: 'child1', content: 'First'}),
                createElement('p', {id: 'child2', content: 'Second'})
            ]
        });
        const clone = cloneNode(el, true);
        
        assert.equal(clone.id, 'parent');
        assert.equal(clone.tagName, 'DIV');
        assert.equal(clone.childNodes.length, 2);
        assert.equal(clone.childNodes[0].id, 'child1');
        assert.equal(clone.childNodes[0].textContent, 'First');
        assert.equal(clone.childNodes[1].id, 'child2');
        assert.equal(clone.childNodes[1].textContent, 'Second');
        assert.notEqual(clone, el);
        assert.notEqual(clone.childNodes[0], el.childNodes[0]);
    });
  
    it('calls elements defined cloneNode', function () {
        class CustomElement extends HTMLElement {
            cloneNode(deep) {
                const clone = document.createElement('custom-element');
                clone.setAttribute('data-cloned', 'true');
                return clone;
            }
        }
        
        window.customElements.define('custom-element', CustomElement);
        
        const customEl = new CustomElement();
        const container = createElement('div', {content: customEl});
        const clone = cloneNode(container, true);
        
        assert.equal(clone.childNodes[0].getAttribute('data-cloned'), 'true');
    });
});