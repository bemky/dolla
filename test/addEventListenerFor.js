import createElement from '../src/createElement';
import trigger from '../src/trigger';
import addEventListenerFor from '../src/addEventListenerFor';
import * as assert from 'assert';

describe('addEventListenerFor', function () {
    
    describe('trigger child', function () {
        const child = createElement('div', {
            class: 'js-test'
        })
        const container = createElement('div', {
            children: child
        })
        
        it('match', function () {
            let triggered = false;            
            addEventListenerFor(container, '.js-test', 'click', e => {
                triggered = true;
            })

            trigger(child, 'click');
            assert.ok(triggered);
        });
  
        it('non-match', function () {
            let triggered = false;
            addEventListenerFor(container, '.js-hello', 'click', e => {
                triggered = true;
            })
    
            trigger(child, 'click');
            assert.ok(!triggered);
        });
    });
    
    describe('trigger descendant', function () {
        const descendant = createElement('div', {
            class: 'js-test'
        })
        const container = createElement('div', {
            children: {
                class: 'descendant1',
                children: {
                    class: 'descendant2',
                    children: descendant
                }
            }
        })
        it('match', function () {
            let triggered = false;
            addEventListenerFor(container, '.js-test', 'click', e => {
                triggered = true;
            })
            
            trigger(descendant, 'click');
            assert.ok(triggered);
        });
  
        it('non-match', function () {
            let triggered = false;
            addEventListenerFor(container, '.js-hello', 'click', e => {
                triggered = true;
            })

            trigger(descendant, 'click');
            assert.ok(!triggered);
        });
  
    });
    
    describe('trigger descendant of descendant', function () {
        const descendant = createElement('div', {
            class: 'js-test'
        })
        const container = createElement('div', {
            class: 'container',
            children: {
                class: 'descendant1',
                children: {
                    class: 'descendant2',
                    children: descendant
                }
            }
        })
        it('match', function () {
            let triggered = false;
            addEventListenerFor(container, '.descendant1', 'click', e => {
                assert.equal(e.target.getAttribute('class'), 'js-test');
                assert.equal(e.delegateTarget.getAttribute('class'), 'descendant1');
                assert.equal(e.currentTarget.getAttribute('class'), 'container');
                triggered = true;
            })
            
            trigger(descendant, 'click');
            assert.ok(triggered);
        });
    });
});