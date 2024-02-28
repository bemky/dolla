import { StateBus } from 'dolla';
import * as assert from 'assert';

describe('StateBus', function () {
    it('get', function () {
        const isOpen = new StateBus(true)
        assert.equal(true, isOpen.get())
    });
    
    it('set', function () {
        const isOpen = new StateBus(true)
        isOpen.set(false)
        assert.equal(false, isOpen.get())
    });
    
    it('addListener', function () {
        const isOpen = new StateBus('foo')
        let pass = false
        isOpen.addListener(() => pass = true)
        isOpen.set('bar')
        assert.ok(pass)
    });
    
    it('removeListener', function () {
        const isOpen = new StateBus('foo')
        let test = 'foo'
        const callback = v => test = v
        isOpen.addListener(callback)
        isOpen.set('bar')
        assert.equal(test, 'bar')
        isOpen.removeListener(callback)
        isOpen.set('charlie')
        assert.equal(test, 'bar')
    });
    
    it('valueOf', function () {
        const isOpen = new StateBus(11)
        assert.ok(isOpen > 10)
    });
})