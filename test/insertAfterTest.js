import {createElement} from 'dolla';
import {append} from 'dolla';
import {insertAfter} from 'dolla';
import * as assert from 'assert';

describe('insertAfter', function () {
  it('insert single element', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')
    insertAfter(el, createElement('div', {id: 'b'}))

    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div>`)
  });

  it('insert string', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')
    insertAfter(el, "Hello World")
    assert.equal(container.innerHTML, `<div id="a"></div>Hello World`)
  });

  it('insert text node', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')
    const holder = createElement('div', {children: 'Hello World'})
    insertAfter(el, holder.childNodes[0])
    assert.equal(container.innerHTML, `<div id="a"></div>Hello World`)
  });

  it('insert array of elements', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')

    insertAfter(el, [createElement('div', {id: 'b'}), createElement('div', {id: 'c'})])

    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });

  it('insert array of strings', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')

    insertAfter(el, ['Hello World', 'Test Taker'])

    assert.equal(container.innerHTML, `<div id="a"></div>Hello WorldTest Taker`)
  });

  it('insert array of text nodes', function () {
    const container = createElement('placeholder', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')
    insertAfter(el, [
      new Text(" "),
      createElement('div', {id: 'c'}),
      new Text("Hello World")
    ])
    assert.equal(container.innerHTML, `<div id="a"></div> <div id="c"></div>Hello World`)
    assert.equal(container.childNodes[0].parentNode, container.childNodes[1].parentNode)
  });

  it('insert NodeList', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')

    const els = createElement('div', {
      children: [createElement('div', {id: 'b'}), createElement('div', {id: 'c'})]
    })
    insertAfter(el, els.childNodes)

    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });

  it('insert HTMLCollection', function () {
    const container = createElement('div', {children: [createElement('div', {id: 'a'})]})
    const el = container.querySelector('#a')

    const els = createElement('div', {
      children: [createElement('div', {id: 'b'}), createElement('div', {id: 'c'})]
    })
    insertAfter(el, els.children)

    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });

  it('insert single element to array', function () {
    const els = [createElement('div', {id: 'a'}), createElement('div', {id: 'b'})]
    const container = createElement('div', {children: els})

    insertAfter(els, createElement('div', {id: 'c'}))
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });

  it('insert single element to NodeList', function () {
    const container = createElement('div', {children: [
      createElement('div', {id: 'a'}),
      createElement('div', {id: 'b'})
    ]})

    insertAfter(container.childNodes, createElement('div', {id: 'c'}))
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });

  it('insert single element to HTMLCollection', function () {
    const container = createElement('div', {children: [
      createElement('div', {id: 'a'}),
      createElement('div', {id: 'b'})
    ]})

    insertAfter(container.children, createElement('div', {id: 'c'}))
    assert.equal(container.innerHTML, `<div id="a"></div><div id="b"></div><div id="c"></div>`)
  });

  it('insert array of elements to array of elements', function () {
    const els = [
      new Text(" "),
      createElement('div', {id: 'b'})
    ]
    const container = createElement('div', {children: els})

    insertAfter(els, [
      new Text(" "),
      createElement('div', {id: 'd'})
    ])
    assert.equal(container.innerHTML, ` <div id="b"></div> <div id="d"></div>`)
  })
  
  it('insert nested arrays', function () {
      const els = [
          new Text(" "),
          [
              createElement('div', {id: 'bar'})
          ],
          createElement('div', {id: 'delta'})
      ]
      const placeholder = createElement('div', {id: 'foo'})
      const container = createElement('div', {children: placeholder})
      insertAfter(placeholder, els)
      assert.equal(container.innerHTML, `<div id="foo"></div> <div id="bar"></div><div id="delta"></div>`)
  })
  
});