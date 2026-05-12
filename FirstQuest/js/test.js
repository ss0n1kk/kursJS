let answers = {
    q1: ['gold', '_gold', '$gold', 'GoldCoin'],
    q2: '30',
    q3: '150',
    q4: 'const myBirthYear = 1995;',
    q5: 'Привет, Алекс!',
    q6: '/* текст */'
};

let cards = document.querySelectorAll('.question-card');

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
            
            let nextCard = cards[i + 1];
            if (nextCard) {
                nextCard.classList.remove('d-none');
            } else {
                let portal = document.getElementById('portal-container');
                let greetingMessage = document.querySelector(`.greeting-card`);

                greetingMessage.classList.add(`d-none`);
                portal.classList.remove('d-none');
            }
        } else {
            alert("Магия не сработала! Попробуй еще раз.");
        }
    });
}