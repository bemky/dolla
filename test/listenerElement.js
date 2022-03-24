import listenerElement from '../src/listenerElement';
import trigger from '../src/trigger';
import * as assert from 'assert';

describe('listenerElement', function () {
    it('all arguments', function (done) {
        let counter = 0;
        const el = listenerElement('button', {
            class: 'foo'
        }, 'click', e => {
            counter++;
            assert.ok(true)
            assert.equal(counter, 1)
            done()
        })
        
        assert.ok(el.classList.contains('foo'))
        assert.equal(el.tagName, 'BUTTON')
        
        trigger(el, 'mouseover')
        trigger(el, 'click')
    });
    
    it('without tagName', function (done) {
        const el = listenerElement({
            class: 'foo'
        }, 'click', e => {
            assert.ok(true)
            done()
        })
        
        assert.ok(el.classList.contains('foo'))
        assert.equal(el.tagName, 'DIV')
        
        trigger(el, 'click')
    });
    
    it('without listener', function (done) {
        const el = listenerElement({
            class: 'foo'
        }, e => {
            assert.ok(true)
            done()
        })
        
        trigger(el, 'click')
    });
    
    it('defined listener', function (done) {
        const el = listenerElement({
            class: 'foo'
        }, 'mouseover', e => {
            assert.ok(true)
            done()
        })
        
        trigger(el, 'mouseover')
    });
})