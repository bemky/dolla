import {toNodes} from 'dolla';
import {createElement} from 'dolla';
import * as assert from 'assert';

describe('toNodes', function () {
  it('null', function () {
    assert.deepEqual(toNodes(null), [])
  })

  it('undefined', function () {
    assert.deepEqual(toNodes(undefined), [])
  })

  it('element', function () {
    const el = createElement('div', {id: 'a'})
    const result = toNodes(el)
    assert.equal(result.length, 1)
    assert.equal(result[0], el)
  })

  it('text node', function () {
    const node = document.createTextNode("Hello")
    const result = toNodes(node)
    assert.equal(result.length, 1)
    assert.equal(result[0], node)
  })

  it('array of elements', function () {
    const a = createElement('div', {id: 'a'})
    const b = createElement('div', {id: 'b'})
    const result = toNodes([a, b])
    assert.equal(result.length, 2)
    assert.equal(result[0], a)
    assert.equal(result[1], b)
  })

  it('NodeList', function () {
    const el = createElement({
      id: 'a',
      content: [{id: 'b', content: 'Hello World'}]
    })
    const result = toNodes(el.childNodes)
    assert.equal(result.length, 1)
    assert.equal(result[0].outerHTML, `<div id="b">Hello World</div>`)
  })

  it('HTMLCollection', function () {
    const el = createElement({
      id: 'a',
      content: [{id: 'b', content: 'Hello World'}]
    })
    const result = toNodes(el.children)
    assert.equal(result.length, 1)
    assert.equal(result[0].outerHTML, `<div id="b">Hello World</div>`)
  })

  it('object of attributes', function () {
    const result = toNodes({content: 'Hello'})
    assert.equal(result.length, 1)
    assert.equal(result[0].outerHTML, `<div>Hello</div>`)
  })

  it('unescaped html', function () {
    const result = toNodes(`<div id="a"></div><div id="b"></div>`)
    assert.equal(result.length, 2)
    assert.equal(result[0].outerHTML, `<div id="a"></div>`)
    assert.equal(result[1].outerHTML, `<div id="b"></div>`)
  })

  it('escaped html', function () {
    const result = toNodes(`<div id="a"></div>`, true)
    assert.equal(result.length, 1)
    assert.equal(result[0], `<div id="a"></div>`)
  })

  it('html string special tag', function () {
    const result = toNodes(`<tr><td>Hello World</td></tr>`)
    assert.equal(result[0].tagName, 'TR')
    assert.equal(result[0].innerHTML, '<td>Hello World</td>')
  })

  it('html string multiple tags', function () {
    const result = toNodes(`<div>Hello</div><div>World</div>`)
    assert.equal(result[0].tagName, 'DIV')
    assert.equal(result[1].tagName, 'DIV')
    assert.equal(result[0].innerHTML, 'Hello')
    assert.equal(result[1].innerHTML, 'World')
  })

  it('html string deeply nested', function () {
    const result = toNodes(`<table>
            <tr>
                <td>Hello</td>
                <td>World</td>
            </tr>
            <tr>
                <td>All Your Base</td>
                <td>Belong to Us</td>
            </tr>
        </table>`)
    assert.equal(result[0].childNodes.item(1).childNodes.item(0).tagName, 'TR')
    assert.equal(result[0].childNodes.item(1).childNodes.item(0).childNodes.item(1).innerHTML, 'Hello')
  })

  it('function', function () {
    const result = toNodes(() => `<div id="a"></div><div id="b"></div>`)
    assert.equal(result.length, 2)
    assert.equal(result[0].outerHTML, `<div id="a"></div>`)
    assert.equal(result[1].outerHTML, `<div id="b"></div>`)
  })

  it('function returning element', function () {
    const result = toNodes(() => createElement('div', {id: 'a'}))
    assert.equal(result.length, 1)
    assert.equal(result[0].outerHTML, `<div id="a"></div>`)
  })

  it('function with context', function () {
    const context = {id: 'a'}
    const result = toNodes(function () {
      return createElement('div', {id: this.id})
    }, context)
    assert.equal(result.length, 1)
    assert.equal(result[0].outerHTML, `<div id="a"></div>`)
  })

  it('promise', async function () {
    const el = createElement('div', {id: 'a'})
    const promise = new Promise(r => r(`<div id="b"></div>`))
    const result = toNodes(promise)
    assert.equal(result.length, 1)
    el.append(...result)
    await promise
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div></div>`)
  })
})
