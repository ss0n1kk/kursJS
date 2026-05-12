document.addEventListener('DOMContentLoaded', function() {
    
    // переменные
    let variableInput = document.querySelector('#variableTestInput');
    let variableBtn = document.querySelector('#firstTestBtn');
    let variableResult = document.querySelector('#variableResult');

    let consoleBtn = document.querySelector('#checkConsoleBtn');
    let consoleResult = document.querySelector('#consoleResult');
    let consoleOptions = document.querySelectorAll('input[name="consoleTest"]');

    let readyBtn = document.querySelector('#readyBtn');
    let questCounter = document.querySelector('#questCounter');
    
    // булевое состояние тестов
    let isVarTestDone = false;
    let isConsoleTestDone = false;

    // проверка (функция)
    function checkAllQuests() {
        let completedCount = 0
        if (isVarTestDone) {completedCount++}
        if (isConsoleTestDone) {completedCount++}

        questCounter.innerHTML = `${completedCount} / 2`;

        if (completedCount === 2) {
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
        } else {
            consoleResult.innerHTML = "Попробуйте другой вариант.";
            consoleResult.style.color = "#ed484bb7";
            isConsoleTestDone = false;
        }

        checkAllQuests();
    });
});