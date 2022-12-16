import listenerElement from '../lib/listenerElement';
import trigger from '../lib/trigger';
import * as assert from 'assert';

describe('listenerElement', function () {
    it('all arguments', function (done) {
        let counter = 0;
        const el = listenerElement('a', {
            class: 'foo'
        }, 'click', e => {
            counter++;
            assert.ok(true)
            assert.equal(counter, 1)
            done()
        })
        
        assert.ok(el.classList.contains('foo'))
        assert.equal(el.tagName, 'A');
        
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
        assert.equal(el.tagName, 'BUTTON')
        
        trigger(el, 'click')
    });
    
    it('without listener', function (done) {
        const el = listenerElement({}, e => {
            assert.ok(true)
            done()
        })
        
        trigger(el, 'click')
    });
    
    it('defined listener', function (done) {
        const el = listenerElement({}, 'mouseover', e => {
            assert.ok(true)
            done()
        })
        
        trigger(el, 'mouseover')
    });
    
    it('multiple listeners', function (done) {
        let count = 0;
        
        const el = listenerElement({}, ['mouseover', 'focus'], e => {
            count++;
            if (count == 2) {
                assert.ok(true)
                done()
            }
        })
        
        trigger(el, 'mouseover')
        trigger(el, 'focus')
    });
})