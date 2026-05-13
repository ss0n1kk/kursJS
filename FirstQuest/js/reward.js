const messages = [
    `— Вижу-вижу! Все цифры на твоей табличке сошлись. Ну и задал ты жару этим переменным!`,
    `Как и обещала — вот твой трофей. <br>Вижу, это твой первый кусок! Без него ты бы застрял в этих руинах навечно. Делай с ним что хочешь.`,
    `<span class="goldText">*Вы получили: [Осколок: Руины Цитадели]*</span>`,
    `Ты выглядишь уставшим. Поднимайся на второй этаж, комната готова. Завтра путь будет неблизким...`
];

const buttons = [
    "Не зря я учился!",
    "Ого, он светится!",
    "Бережно убрать осколок",
    "ЛЕЧЬ СПАТЬ..."
];

let step = 0;
const chatBox = document.querySelector('#chat');
const answerBtn = document.querySelector('#answerBtn');

function nextStep() {
    if (step >= messages.length - 1) {
        document.body.style.transition = "3s";
        document.body.style.filter = "brightness(0)";
        setTimeout(() => {
            window.location.href = "final-dream.html";
        }, 3000);
        return;
    }

    step++;

    chatBox.innerHTML += `
        <div class="d-flex align-items-start mb-4 animate-fade-in">
            <img src="../assets/friren.jpg" class="message-avatar me-3">
            <div class="message p-3">
                <div class="message-name mb-1">Трактирщик Фрирен</div>
                <div class="message-text">${messages[step]}</div>
            </div>
        </div>
    `;

    answerBtn.innerText = buttons[step];

    chatBox.scrollTop = chatBox.scrollHeight;
}

answerBtn.addEventListener('click', nextStep);

document.addEventListener('DOMContentLoaded', () => {
    step = 0;
    chatBox.innerHTML += `
        <div class="d-flex align-items-start mb-4 animate-fade-in">
            <img src="../assets/friren.jpg" class="message-avatar me-3">
            <div class="message p-3">
                <div class="message-name mb-1">Трактирщик Фрирен</div>
                <div class="message-text">${messages[0]}</div>
            </div>
        </div>
    `;

    answerBtn.innerText = buttons[0]; 
});