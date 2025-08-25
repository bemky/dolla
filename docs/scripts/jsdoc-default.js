document.addEventListener('DOMContentLoaded', function () {
    document.body.querySelector('.sm-nav-overlay').addEventListener('click', e => {
        if (e.target.tagName == 'A') {
            document.body.querySelector('.sm-nav-trigger').checked = false
        }
    });
    
    
    document.body.querySelectorAll('.overflow-container').forEach(container => {
        if (container.scrollWidth > container.clientWidth) {
            const overflowObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.target.classList.contains('overflow-anchor')) {
                        entry.target.parentElement.classList.toggle('scroll-end', entry.intersectionRatio == 1)
                    } else {
                        entry.target.parentElement.classList.toggle('overflowing', entry.intersectionRatio < 1)
                    }
                })
            }, {threshold: [1], root: container});
            Array.from(container.children).forEach(child => {
                overflowObserver.observe(child);
            })
            const anchor = document.createElement('div')
            anchor.style = 'width: 1px; height: 1px; flex: 0 0 1px;'
            anchor.classList.add('overflow-anchor')
            container.append(anchor)
            overflowObserver.observe(anchor)
        }
    })
})