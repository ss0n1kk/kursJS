let answers = {
    q1: ['gold', '_gold', '$gold', 'GoldCoin'],
    q2: '30',
    q3: '150',
    q4: 'const myBirthYear = 1995;',
    q5: 'Привет, Алекс!',
    q6: '/* текст */'
};

let cards = document.querySelectorAll('.question-card');

if (typeof emailjs !== 'undefined' && typeof emailjs.init === 'function') {
    emailjs.init({
        publicKey: "hq0ANLtXUwAtkFKcb"
    });
}

// Отслеживание ошибок
let errorLog = JSON.parse(localStorage.getItem('testErrorLog')) || {};
let questionsWithErrors = new Set(JSON.parse(localStorage.getItem('questionsWithErrors') || '[]'));

// сохранение прогресса в localStorage
let currentStep = parseInt(localStorage.getItem('testCurrentStep')) || 0;

if (currentStep >= cards.length) {
    showPortal();
} else {
    cards[0].classList.add('d-none');
    cards[currentStep].classList.remove('d-none');
}

function showPortal() {
    let portal = document.getElementById('portal-container');
    let greetingMessage = document.querySelector(`.greeting-card`);
    if (greetingMessage) greetingMessage.classList.add(`d-none`);
    cards.forEach(card => card.classList.add('d-none'));
    portal.classList.remove('d-none');
}

// Отправить уведомление о сложности теста
function sendDifficultyAlert(questionId) {
    const templateParams = {
        question_id: questionId,
        message_type: 'Пользователь не может пройти тесты - требуется упрощение',
        error_count: questionsWithErrors.size,
        questions_with_errors: Array.from(questionsWithErrors).join(', ')
    };

    if (typeof emailjs === 'undefined' || typeof emailjs.send !== 'function') {
        console.warn('EmailJS не доступен, уведомление не отправлено');
        return;
    }

    emailjs.send('service_gaqt8bo', 'template_43dm7ia', templateParams)
        .then((response) => {
            console.log('Уведомление о сложности теста отправлено администратору');
        })
        .catch((error) => {
            console.error('Ошибка при отправке уведомлении о сложности теста:', error);
        });
}

for (let i = 0; i < cards.length; i++) {
    let currentCard = cards[i];
    let btn = currentCard.querySelector('.check-btn');

    btn.addEventListener('click', function() {
        let questionId = currentCard.id;
        let userChoices = [];
        
        let inputs = currentCard.querySelectorAll('input:checked');
        for (let i = 0; i < inputs.length; i++) {
            userChoices.push(inputs[i].value);
        }

        let isCorrect = false;
        let rightAnswer = answers[questionId];

        if (Array.isArray(rightAnswer)) {
            let matchCount = 0;
            
            for (let i = 0; i < userChoices.length; i++) {
                if (rightAnswer.includes(userChoices[i])) matchCount++;
            }
            if (matchCount == rightAnswer.length && userChoices.length == rightAnswer.length) {
                isCorrect = true;
            }
        } else {
            if (userChoices[0] === rightAnswer) {
                isCorrect = true;
            }
        }

        if (isCorrect) {
            currentCard.classList.add('d-none');
            
            let nextStep = i + 1;
            let nextCard = cards[nextStep];
            if (nextCard) {
                nextCard.classList.remove('d-none');
                localStorage.setItem('testCurrentStep', nextStep);
            } else {
                localStorage.setItem('testCurrentStep', cards.length);
                showPortal();
            }
        } else {
            // Отслеживание ошибок
            if (!questionsWithErrors.has(questionId)) {
                questionsWithErrors.add(questionId);
                localStorage.setItem('questionsWithErrors', JSON.stringify(Array.from(questionsWithErrors)));
                
                // Если 6 ошибок в разных заданиях - отправить уведомление
                if (questionsWithErrors.size === 6) {
                    sendDifficultyAlert(questionId);
                }
            }
            
            alert("Магия не сработала! Попробуйте еще раз.");
        }
    });
}