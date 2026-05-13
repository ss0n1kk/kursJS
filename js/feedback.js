// Общий скрипт для формы обратной связи
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

(async () => {
    if (typeof bootstrap === 'undefined') {
        await loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js');
    }
    if (typeof emailjs === 'undefined') {
        await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
    }

    function initFeedback() {
        // Инициализация EmailJS (не критична для работы)
        if (typeof emailjs !== 'undefined' && typeof emailjs.init === 'function') {
            emailjs.init({
                publicKey: "hq0ANLtXUwAtkFKcb"
            });
        }

        const feedbackBtn = document.getElementById('feedbackBtn');
        const sendFeedbackBtn = document.getElementById('sendFeedbackBtn');
        const feedbackForm = document.getElementById('feedbackForm');

        if (!feedbackBtn) return; // Если кнопки нет, выходим

        const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));

        // Открыть модальное окно
        feedbackBtn.addEventListener('click', () => {
            feedbackModal.show();
        });

        // Отправить отзыв
        if (sendFeedbackBtn) {
            sendFeedbackBtn.addEventListener('click', () => {
                const userName = document.getElementById('userName').value;
                const userEmail = document.getElementById('userEmail').value;
                const userRating = document.getElementById('userRating') ? document.getElementById('userRating').value : '';
                const userFeedback = document.getElementById('userFeedback').value;

                const userRatingElement = document.getElementById('userRating');
                const requiresRating = !!userRatingElement;

                if (!userName || !userFeedback || (requiresRating && !userRating)) {
                    alert('Заполните все поля!');
                    return;
                }

                // Параметры для EmailJS
                const templateParams = {
                    user_name: userName,
                    user_email: userEmail || '',
                    user_rating: userRating || '',
                    user_feedback: userFeedback,
                    message_type: 'Отзыв о курсе'
                };

                // Отправить email
                console.log('Отправка отзыва:', templateParams);
                if (typeof emailjs === 'undefined' || typeof emailjs.send !== 'function') {
                    console.error('EmailJS не загружен');
                    alert('❌ Система отправки отзывов временно недоступна. Попробуйте позже.');
                    return;
                }

                emailjs.send('service_gaqt8bo', 'template_pezddtu', templateParams)
                    .then((response) => {
                        alert('✅ Спасибо за ваш отзыв! Вы помогаете в улучшении курса.');
                        feedbackForm.reset();
                        feedbackModal.hide();
                    })
                    .catch((error) => {
                        console.error('Ошибка при отправке:', error);
                        alert('❌ Ошибка при отправке. Попробуйте позже.');
                    });
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFeedback);
    } else {
        initFeedback();
    }
})();