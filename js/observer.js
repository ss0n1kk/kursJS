const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 }); // 0.1 означает, что блок начнет появляться, когда видно 10% его высоты

// Запускаем слежку за всеми нужными блоками
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));