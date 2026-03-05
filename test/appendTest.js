import {createElement} from 'dolla';
import {append} from 'dolla';
import * as assert from 'assert';

describe('append', function () {
  it('single element', function () {
    const el = createElement('div', {id: 'a'})
    append(el, createElement('div', {id: 'b'}))
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div></div>`)
  });

  it('text', function () {
    const el = createElement('div', {id: 'a'})
    append(el, document.createTextNode("Hello"))
    assert.equal(el.outerHTML, `<div id="a">Hello</div>`)

    append(el, " Test")
    assert.equal(el.outerHTML, `<div id="a">Hello Test</div>`)
  });

  it('array of elements', function () {
    const el = createElement('div', {id: 'a'})
    append(el, [createElement('div', {id: 'b'}), createElement('div', {id: 'c'})])
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div><div id="c"></div></div>`)
  });

  it('multiple element arguments', function () {
    const el = createElement('div', {id: 'a'})
    append(el, createElement('div', {id: 'b'}), createElement('div', {id: 'c'}))
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div><div id="c"></div></div>`)
  });

  it('promise', async function () {
    const el = createElement('div', {id: 'a'})
    const promise = new Promise((success) => {
      success(`<div id="b"></div><div id="c"></div>`)
    })
    append(el, promise)
    await promise
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div><div id="c"></div></div>`)
  })

  it('proxy', async function () {
    const el = createElement('div', {id: 'a'})
    const proxy = new Proxy({
      content: '<div id="b"></div>'
    }, {
      get: (target, prop) => target[prop]
    })
    await append(el, proxy.content)

    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div></div>`)
  })

  it('proxy with promise', async function () {
    // Taken from malomalo/viking
    const isProxy = Symbol("isProxy")
    function wrappingFunction () { }
    function neverEndingProxy(target) {
        return new Proxy(wrappingFunction, {
            get: (fn, prop, receiver) => {
                if (prop === isProxy) { return target; }

                if ( prop === 'then' || prop === 'catch') {
                    return target[prop].bind(target);
                } else {
                    return neverEndingProxy(target.then(t => {
                        let value = t[prop]
                        if (typeof value === 'function') {
                            let proxyPromise = value[isProxy];
                            if (proxyPromise) {
                                return proxyPromise.then ( (r) => {
                                    return typeof r === 'function' ? r.bind(t) : r
                                });
                            } else {
                                return value.bind(t);
                            }
                        } else {
                            return value;
                        }
                    }));
                }
            },
            apply: (fn, thisArg, args) => {
                return neverEndingProxy(target.then((t) => t(...args)));
            }
        });
    }

    const el = createElement('div', {id: 'a'})
    let render;
    const proxy = neverEndingProxy(new Promise(r => { render = r }))
    append(el, proxy.content)
    render({ content: '<div id="b"></div>' })
    await new Promise(r => setTimeout(r, 0))
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div></div>`)
  })

  it('promise with text', async function () {
    const el = createElement('div', {id: 'a'})
    const promise = new Promise((success) => {
      success([createElement({id: 'b'}), 'Hello', document.createTextNode(' Test')])
    })
    append(el, promise)
    await promise
    assert.equal(el.outerHTML, `<div id="a"><div id="b"></div>Hello Test</div>`)
  })
});
