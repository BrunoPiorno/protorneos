$(document).ready(function() {
    // Animación de contadores
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

    // Iniciar animación cuando el elemento sea visible
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

    // Verificar al cargar y al hacer scroll
    checkCounters();
    $(window).on('scroll', checkCounters);

    // Manejo del FAQ acordeón
    $('.faq__question').click(function() {
        const $question = $(this);
        const $answer = $question.next('.faq__answer');
        const $content = $answer.find('p');

        // Cerrar todas las respuestas excepto la actual
        $('.faq__answer').not($answer).each(function() {
            $(this).css('height', '0');
            $(this).removeClass('active');
        });
        $('.faq__question').not($question).removeClass('active');

        // Alternar la respuesta actual
        if ($answer.hasClass('active')) {
            $answer.css('height', '0');
            $answer.removeClass('active');
            $question.removeClass('active');
        } else {
            const contentHeight = $content.outerHeight();
            $answer.css('height', contentHeight + 'px');
            $answer.addClass('active');
            $question.addClass('active');
        }
    });
});