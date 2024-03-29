document.addEventListener("DOMContentLoaded", function(event) {
    const sections = document.querySelectorAll('.section-container');
    sections.forEach((section, index) => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });

    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(scrollLink => {
        scrollLink.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = scrollLink.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 50;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        header.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
    });

    const headerTitle = document.querySelector('header h1');
    headerTitle.classList.add('typing'); 
    
    headerTitle.addEventListener('animationend', function() {
        headerTitle.classList.remove('typing');
    });
});
