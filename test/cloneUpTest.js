import { createElement } from 'dolla';
import { cloneUp } from 'dolla';
import * as assert from 'assert';

describe('cloneUp', function () {
    it('element already matches selector', function () {
        const parent = createElement('div', {class: 'parent'});
        const el = createElement('div', {id: 'target', class: 'match'});
        parent.appendChild(el)
        const clone = cloneUp(el, '.match');
        
        assert.equal(clone.id, 'target');
        assert.equal(clone.className, 'match');
        assert.equal(clone.tagName, 'DIV');
        assert.notEqual(clone, el);
        assert.equal(null, clone.parentElement)
    });

    it('clones up to matching ancestor', function () {
        const greatgrandparent = createElement('div', {class: 'outer-container'});
        const grandparent = createElement('section', {class: 'container'});
        const parent = createElement('div', {class: 'parent'});
        const child = createElement('span', {id: 'child', content: 'text'});
        
        greatgrandparent.appendChild(grandparent)
        grandparent.appendChild(parent);
        parent.appendChild(child);
        
        const clone = cloneUp(child, '.container');
        
        assert.equal(clone.parentElement.tagName, 'DIV');
        assert.equal(clone.parentElement.className, 'parent');
        
        assert.equal(clone.parentElement.parentElement.tagName, 'SECTION');
        assert.equal(clone.parentElement.parentElement.className, 'container');
        assert.equal(null, clone.parentElement.parentElement.parentElement)
    });

    it('includes siblings by default', function () {
        const parent = createElement('div', {class: 'parent'});
        const sibling1 = createElement('span', {id: 'sibling1'});
        const target = createElement('p', {id: 'target'});
        const sibling2 = createElement('div', {id: 'sibling2'});
        
        parent.appendChild(sibling1);
        parent.appendChild(target);
        parent.appendChild(sibling2);
        
        const clone = cloneUp(target, '.parent');
        
        assert.equal(clone.parentElement.childNodes.length, 3);
        assert.equal(clone.parentElement.childNodes[0].id, 'sibling1');
        assert.equal(clone.parentElement.childNodes[1].id, 'target');
        assert.equal(clone.parentElement.childNodes[2].id, 'sibling2');
    });

    it('excludes siblings matching exclude selector', function () {
        const parent = createElement('div', {class: 'parent'});
        const sibling1 = createElement('span', {id: 'sibling1', class: 'keep'});
        const sibling2 = createElement('span', {id: 'sibling2', class: 'exclude'});
        const target = createElement('p', {id: 'target'});
        const sibling3 = createElement('div', {id: 'sibling3', class: 'exclude'});
        const sibling4 = createElement('div', {id: 'sibling4', class: 'keep'});
        
        parent.appendChild(sibling1);
        parent.appendChild(sibling2);
        parent.appendChild(target);
        parent.appendChild(sibling3);
        parent.appendChild(sibling4);
        
        const clone = cloneUp(target, '.parent', {siblings: {exclude: '.exclude'}});
        
        assert.equal(clone.parentElement.childNodes.length, 3);
        assert.equal(clone.parentElement.childNodes[0].id, 'sibling1');
        assert.equal(clone.parentElement.childNodes[1].id, 'target');
        assert.equal(clone.parentElement.childNodes[2].id, 'sibling4');
    });

    it('handles text nodes as siblings', function () {
        const parent = createElement('div', {class: 'parent'});
        const textNode1 = document.createTextNode('before');
        const target = createElement('span', {id: 'target'});
        const textNode2 = document.createTextNode('after');
        
        parent.appendChild(textNode1);
        parent.appendChild(target);
        parent.appendChild(textNode2);
        
        const clone = cloneUp(target, '.parent');
        
        assert.equal(clone.parentElement.childNodes.length, 3);
        assert.equal(clone.parentElement.childNodes[0].textContent, 'before');
        assert.equal(clone.parentElement.childNodes[1].id, 'target');
        assert.equal(clone.parentElement.childNodes[2].textContent, 'after');
    });

    it('returns original clone when no parent', function () {
        const el = createElement('div', {id: 'orphan'});
        const clone = cloneUp(el, '.nonexistent');
        
        assert.equal(clone.id, 'orphan');
        assert.equal(clone.tagName, 'DIV');
        assert.notEqual(clone, el);
    });

    it('uses dolla cloneNode for custom elements', function () {
        class CustomElement extends HTMLElement {
            cloneNode(deep = false) {
                const clone = super.cloneNode(deep);
                clone.dataset.customCloned = 'true';
                return clone;
            }
        }
        window.customElements.define('custom-test-element', CustomElement);

        const parent = createElement('div', {class: 'parent'});
        const customEl = new CustomElement();
        customEl.id = 'custom';
        const child = createElement('div', {class: 'child'});
        parent.appendChild(new CustomElement());
        parent.appendChild(child);

        const clone = cloneUp(child, '.parent');
        
        assert.equal(clone.className, 'child');
        assert.equal(clone.previousElementSibling.dataset.customCloned, 'true');
    });
});