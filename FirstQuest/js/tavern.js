let messages = [
    `*Дверь таверны распахивается от магического импульса* <br> 
    — Ого! Прямо из портала? Ну и напугал ты моих посетителей, странник!`,
    
    `Вижу на твоих руках пыль Цитадели... Значит, Магистр всё-таки нашел себе ученика. <br>
    Добро пожаловать в <span class="goldText">«Отдохнувший дракон»</span> — последнее безопасное место в этих руинах.`,
    
    `Не так быстро! Слушай, раз ты теперь дипломированный маг, помоги мне! <br>
    В этом бардаке после набега демонов я совсем запуталась в запасах. У меня тут: 
    <span class="text-danger"><br>-12 бочек эля;<br>-5 кувшинов вина;<br>-8 бутылок зелья;</span>`,
    
    `Создай для них магические сосуды и сосчитай общее количество, как тебя учил Магистр. 
    Сделаешь это — и я дам тебе наводку, где искать первый Осколок Ключа!`
]

let buttons = [
    "*отдышка*",
    "Я от Магистра. Он сказал что у тебя есть осколок.",
    "Я готов начинать!"
]

let step = 0;

let chatBox = document.querySelector('#chat');
let answerBtn = document.querySelector('#answerBtn');
let acceptBtn = document.querySelector('#acceptBtn');

function nextStep() {
    if (step < messages.length) {
        chatBox.innerHTML += `
            <div class="d-flex align-items-start mb-4 animate-fade-in">
                <img src="../assets/friren.jpg" class="message-avatar me-3">
                <div class="message p-3">
                    <div class="message-name mb-1">Трактирщик Фрирен</div>
                    <div class="message-text">${messages[step]}</div>
                </div>
            </div>
        `;

        if (step === messages.length - 1) {
            answerBtn.classList.add('d-none');
            acceptBtn.classList.remove('d-none');
        } else {
            answerBtn.innerText = buttons[step];
        }

        step++;

        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

answerBtn.addEventListener('click', nextStep);

nextStep();