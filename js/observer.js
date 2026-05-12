const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 }); // 0.1 означает, что блок начнет появляться, когда видно 10% его высоты

// Запускаем слежку за всеми нужными блоками
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
        observer.observe(el);
        // Проверяем если элемент уже в viewport при загрузке
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        }
    });
});