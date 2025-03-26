import {createElement, sort} from 'dolla';
import * as assert from 'assert';

describe('sort', function () {
    it('children', function () {
        const el = createElement({
            content: [
                { data: {index: 3} },
                { data: {index: 1} },
                { data: {index: 2} },
            ]
        })
        sort(el.children, (a, b) => {
            return a.dataset.index - b.dataset.index
        })
        
        assert.equal(el.innerHTML, `<div data-index="1"></div><div data-index="2"></div><div data-index="3"></div>`)
    })
    
    it('childNodes', function () {
        const el = createElement({
            content: [
                document.createTextNode("hello "),
                document.createTextNode("my "),
                document.createTextNode("name "),
            ]
        })
        sort(el.childNodes, (a, b) => {
            return a.length - b.length
        })
        
        assert.equal(el.innerHTML, `my name hello `)
    })
    
    it('array', function () {
        const el = createElement({
            content: [
                { tag: 'img', src: '4' },
                { tag: 'img', src: '2' },
                { tag: 'img', src: '5' },
                { tag: 'img', src: '1' },
                { tag: 'img', src: '3' },
            ]
        })
        sort(Array.from(el.children), (a, b) => {
            return a.getAttribute('src') - b.getAttribute('src')
        })
        
        assert.equal(el.innerHTML, `<img src="1"><img src="2"><img src="3"><img src="4"><img src="5">`)
    })
});