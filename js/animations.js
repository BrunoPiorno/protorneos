document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez que se activa
            }
        });
    }, {
        threshold: 0.2, // 20% del elemento debe ser visible
        rootMargin: '0px 0px -50px 0px' // Activar un poco antes
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
