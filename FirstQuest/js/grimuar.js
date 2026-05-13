document.addEventListener('DOMContentLoaded', function() {
    
    // переменные
    let variableInput = document.querySelector('#variableTestInput');
    let variableBtn = document.querySelector('#firstTestBtn');
    let variableResult = document.querySelector('#variableResult');

    let consoleBtn = document.querySelector('#checkConsoleBtn');
    let consoleResult = document.querySelector('#consoleResult');
    let consoleOptions = document.querySelectorAll('input[name="consoleTest"]');

    let sumBtn = document.querySelector('#sumTestBtn');
    let sumResult = document.querySelector('#sumResult');
    let sumOptions = document.querySelectorAll('input[name="sumTest"]');

    let readyBtn = document.querySelector('#readyBtn');
    let questCounter = document.querySelector('#questCounter');
    
    // восстановление прогресса из localStorage
    let isVarTestDone = localStorage.getItem('isVarTestDone') === 'true';
    let isConsoleTestDone = localStorage.getItem('isConsoleTestDone') === 'true';
    let isSumTestDone = localStorage.getItem('isSumTestDone') === 'true';

    if (isVarTestDone) {
        variableResult.innerHTML = "Верно! Иди дальше!";
        variableResult.style.color = "#74ff72ae";
        variableBtn.disabled = true;
    }

    if (isConsoleTestDone) {
        consoleResult.innerHTML = "Верно! Иди дальше!";
        consoleResult.style.color = "#74ff72ae";
        consoleBtn.disabled = true;
        document.querySelector('#opt2').checked = true;
    }

    if (isSumTestDone) {
        sumResult.innerHTML = "Верно! Иди дальше!";
        sumResult.style.color = "#74ff72ae";
        sumBtn.disabled = true;
        document.querySelector('#sumOpt2').checked = true;
    }
    
    checkAllQuests();


    // проверка (функция)
    function checkAllQuests() {
        let completedCount = 0
        if (isVarTestDone) {completedCount++}
        if (isConsoleTestDone) {completedCount++}
        if (isSumTestDone) {completedCount++}

        questCounter.innerHTML = `${completedCount} / 3`;

        if (completedCount === 3) {
            readyBtn.disabled = false;
            questCounter.style.color = "#74ff72ae";
            readyBtn.classList.add(`btnDone`)
            readyBtn.innerHTML = `Я готов к испытанию!`
        } else {
            readyBtn.disabled = true;
            readyBtn.innerHTML = `Вы еще не закончили тесты!`
        }
    }

    // первый тест
    variableBtn.addEventListener('click', function() {
        let answer = variableInput.value.trim();
        
        if (answer == "3 5 6 8" || answer == "3568") {
            variableResult.innerHTML = "Верно! Иди дальше!";
            variableResult.style.color = "#74ff72ae";
            isVarTestDone = true;
            localStorage.setItem('isVarTestDone', 'true');

            variableInput.value = ``
        } else {
            variableResult.innerHTML = "Ошибка";
            variableResult.style.color = "#ED484B";
            isVarTestDone = false;
        }
        
        checkAllQuests();
    });

    // второй тест
    consoleBtn.addEventListener('click', function() {
        let selectedValue = "";
        
        for (let i = 0; i < consoleOptions.length; i++) {
            if (consoleOptions[i].checked) {
                selectedValue = consoleOptions[i].value;
            }
        }

        if (selectedValue == "2") {
            consoleResult.innerHTML = "Задание пройдено!";
            consoleResult.style.color = "#74ff72ae";
            isConsoleTestDone = true;

            localStorage.setItem('isConsoleTestDone', 'true');
        } else {
            consoleResult.innerHTML = "Попробуйте другой вариант.";
            consoleResult.style.color = "#ed484bb7";
            isConsoleTestDone = false;
        }

        checkAllQuests();
    });

    // третий тест
    sumBtn.addEventListener('click', function() {
        let selectedValue = "";
        for (let i = 0; i < sumOptions.length; i++) {
            if (sumOptions[i].checked) {
                selectedValue = sumOptions[i].value;
            }
        }

        if (selectedValue == "2") {
            sumResult.innerHTML = "Задание пройдено!";
            sumResult.style.color = "#74ff72ae";
            isSumTestDone = true;
            localStorage.setItem('isSumTestDone', 'true');
        } else {
            sumResult.innerHTML = "Попробуйте другой вариант.";
            sumResult.style.color = "#ed484bb7";
            isSumTestDone = false;
        }

        checkAllQuests();
    });
});