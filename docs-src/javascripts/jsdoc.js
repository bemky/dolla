
document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.intersectionRatio > 0.25)
        })
        const visibleSection = document.querySelector('.section-method.visible');
        if (visibleSection){
            document.querySelectorAll('nav .nav-item a.active').forEach(a => a.classList.remove('active'));
            
            const id = visibleSection.querySelector('[id]')?.id
            if (id) {
                const target = document.querySelector('nav .nav-item a[href="global.html#' + id + '"]')
                if (target) {
                    target.classList.add('active');
                }
            }
        }
        
    }, {threshold: [0.25]});
    
    document.querySelectorAll('.section-method').forEach(section => {
        observer.observe(section)
    })
})