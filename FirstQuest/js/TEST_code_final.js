    const codeInput = document.querySelector('#codeInput');
    const checkBtn = document.querySelector('#checkCodeBtn');
    const feedbackText = document.querySelector('#feedbackText');
    const feedbackBlock = document.querySelector('#feedbackBlock');
    
    // Загрузка сохранённого кода при загрузке страницы
    const savedCode = localStorage.getItem('testCodeInput');
    if (savedCode) {
        codeInput.value = savedCode;
    }
    
    // Сохранение кода в реальном времени
    codeInput.addEventListener('input', () => {
        localStorage.setItem('testCodeInput', codeInput.value);
    });
    
    checkBtn.addEventListener('click', () => {
        let userCode = codeInput.value.toLowerCase();
        
        let hasAle = userCode.includes(`let ` || `const `) && (userCode.includes(`alebarrels = 12` || `alebarrels=12`))
        let hasHoney = userCode.includes(`let ` || `const `) && (userCode.includes(`honeyjugs = 5` || `honeyjugs=5`));
        let hasPotion = userCode.includes(`let ` || `const `) && (userCode.includes(`potionbottles = 8` || `potionbottles=8`));
        let hasSum = userCode.includes(`let ` || `const `) && (userCode.includes(`storage =` || `storage=`)) && (userCode.includes(`alebarrels + potionbottles + honeyjugs` || `alebarrels+potionbottles+honeyjugs` || `alebarrels+ potionbottles+ honeyjugs`));
        let hasLog = userCode.includes(`console.log(storage)`);
        
        if (hasAle && hasHoney && hasPotion && hasSum && hasLog) {
            feedbackText.innerText = `🥳 Идеально! Весь товар учтён, Боблин доволен.`;
            feedbackText.style.color = `#BDFFAF`;

            document.querySelector('#finishQuestBtn').classList.remove('d-none');
        } else {
            feedbackText.innerText = `Ошибка в заклинании! Важно соблюдать ВСЕ условия. Попробуй еще раз!`;
            feedbackText.style.color = `#FF4848`;
        }
        
        feedbackBlock.classList.remove('d-none');
    });

    let hintBtn = document.querySelector(`#hintBtn`)
    
    hintBtn.addEventListener(`click`, function(){
        alert(`Попробуй сначала призвать сосуды: aleBarrels; honeyJugs; potionBottles.

Потом задай им значение(кол-во)

В конце сложи их в новом сосуде "storage" и выведи его в Магичсекое Зеркало

ps: (можешь попробовать проверить код в консоли внутри браузера)`)
    });
