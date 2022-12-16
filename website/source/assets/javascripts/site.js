import {addEventListenerFor} from 'dolla';

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash)
        if (target) {
            target.scrollIntoView()
        }
    }
    
    addEventListenerFor(document.querySelector('.uniformNav'), 'a', 'click', e => {
        const target = document.querySelector(e.delegateTarget.getAttribute('href'))
        if (target) {
            target.scrollIntoView({behavior: 'smooth'})
            history.pushState({}, '', e.delegateTarget.href)
            e.preventDefault()
        }
    })
    
    addEventListenerFor(document, '.js-toggle-source', 'click', e => {
        document.querySelector(e.delegateTarget.getAttribute('rel')).classList.toggle('hide')
    })
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.intersectionRatio > 0.25)
        })
        const visibleSection = document.querySelector('.section.visible');
        if (visibleSection){
            document.querySelectorAll('.uniformNav a.active').forEach(a => a.classList.remove('active'));
            const target = document.querySelector('.uniformNav a[href="#' + visibleSection.id + '"]')
            if (target) {
                target.classList.add('active');
            }
        }
        
    }, {threshold: [0.25]});
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section)
    })
})