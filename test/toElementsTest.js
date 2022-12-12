import toElements from '../src/toElements';
import * as assert from 'assert';

describe('toElements', function () {
  it('html string', function () {
    const els = toElements(`<div>Hello World</div>`);
    assert.equal(els.item(0).tagName, 'DIV')
    assert.equal(els.item(0).innerHTML, 'Hello World')  
  });
  
  it('html string special tag', function () {
    const els = toElements(`<tr><td>Hello World</td></tr>`);
    assert.equal(els.item(0).tagName, 'TR')
    assert.equal(els.item(0).innerHTML, '<td>Hello World</td>')  
  });
  
  it('html string multiple tag', function () {
    const els = toElements(`<div>Hello</div><div>World</div>`);
    assert.equal(els.item(0).tagName, 'DIV');
    assert.equal(els.item(1).tagName, 'DIV');
    assert.equal(els.item(0).innerHTML, 'Hello');
    assert.equal(els.item(1).innerHTML, 'World');
  });
  
  it('html string deeply nested', function () {
    const els = toElements(`
        <table>
            <tr>
                <td>Hello</td>
                <td>World</td>
            </tr>
            <tr>
                <td>All Your Base</td>
                <td>Belong to Us</td>
            </tr>
        </table>
    `);
    assert.equal(els.item(0).outerHTML, `<table>
            <tbody><tr>
                <td>Hello</td>
                <td>World</td>
            </tr>
            <tr>
                <td>All Your Base</td>
                <td>Belong to Us</td>
            </tr>
        </tbody></table>`)
    assert.equal(els.item(0).childNodes.item(1).childNodes.item(0).tagName, 'TR')
    assert.equal(els.item(0).childNodes.item(1).childNodes.item(0).childNodes.item(1).innerHTML, 'Hello')
  });
  
});