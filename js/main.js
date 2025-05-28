$(document).ready(function() {
    // Actualizar año del copyright
    $('#current-year').text(new Date().getFullYear());

    // Mobile menu toggle
    const menuToggle = $('.header__menu-toggle');
    const nav = $('.header__nav');
    const menuLinks = $('.header__menu a');

    let menuOpen = false;

    function toggleMenu() {
        menuOpen = !menuOpen;
        nav.toggleClass('active');
        
        const icon = menuToggle.find('i');
        
        if (menuOpen) {
            icon.fadeOut(150, function() {
                $(this).removeClass('fa-bars').addClass('fa-times').fadeIn(150);
            });
        } else {
            icon.fadeOut(150, function() {
                $(this).removeClass('fa-times').addClass('fa-bars').fadeIn(150);
            });
        }

        if (menuOpen) {
            $('.header__menu li').each(function(index) {
                $(this).css({
                    'transition-delay': `${0.1 + index * 0.1}s`
                });
            });
        } else {
            $('.header__menu li').css('transition-delay', '0s');
        }

        $('body').toggleClass('no-scroll', menuOpen);
    }

    menuToggle.on('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Manejar clicks en enlaces del menú
    menuLinks.on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        
        if (menuOpen) {
            toggleMenu();
            
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80 
                }, 800, 'easeInOutQuart');
            }, 300);
        } else {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutQuart');
        }
    });

    $(document).on('click', function(e) {
        if (menuOpen && !$(e.target).closest('.header__nav, .header__menu-toggle').length) {
            toggleMenu();
        }
    });

    $(window).on('resize', function() {
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu();
        }
    });


    // Marquee scroll effect
    const marqueeContent = document.querySelector('.hero-marquee__content');
    let lastScrollTop = 0;
        
    window.addEventListener('scroll', () => {
        if (marqueeContent) {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            const direction = st > lastScrollTop ? 1 : -1;
            const scrollDiff = Math.abs(st - lastScrollTop);
            const speed = Math.min(scrollDiff * 6, 100);    
            
            const currentTransform = getComputedStyle(marqueeContent).transform;
            const matrix = new DOMMatrix(currentTransform);
            const currentX = matrix.m41;
            
            const newX = currentX - (direction * speed);
            marqueeContent.style.transform = `translateX(${newX}px)`;
            
            lastScrollTop = st <= 0 ? 0 : st;
        }
    });

    function animateCounter(element) {
        const target = parseInt($(element).data('target'));
        const counterValue = $(element).find('.counter-value');
        const duration = 2000; // 2 segundos
        const steps = 50;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            counterValue.text(Math.floor(current));
        }, duration / steps);
    }

    function checkCounters() {
        $('.counter-item').each(function() {
            const element = this;
            if ($(element).find('.counter-value').text() === '0') {
                const position = $(element).offset().top;
                const windowHeight = $(window).height();
                const scrollTop = $(window).scrollTop();

                if (position < (windowHeight + scrollTop)) {
                    animateCounter(element);
                }
            }
        });
    }

    checkCounters();
    $(window).on('scroll', checkCounters);

    // Inicializar el slider de testimonios
    const testimonialSlider = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 32,
            }
        },
    });

    $('.faq__question').click(function() {
        const $question = $(this);
        const $answer = $question.next('.faq__answer');
        const $content = $answer.find('p');

    });
});