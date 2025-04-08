const scrollContainer = document.querySelector('.scroll-container');

function updateBackgroundPosition(scrollPosition) {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        document.body.style.backgroundPosition = `${-scrollPosition * 0.12 - 500}px center`;
    } else {
        document.body.style.backgroundPosition = `${-scrollPosition * 0.2}px center`;
    }
}

scrollContainer.addEventListener('wheel', function(event) {
    if (event.deltaY !== 0) {
        scrollContainer.scrollLeft += event.deltaY;
        event.preventDefault();
    }
});

scrollContainer.addEventListener('scroll', function() {
    const scrollPosition = scrollContainer.scrollLeft;
    updateBackgroundPosition(scrollPosition);
});

window.addEventListener('resize', function() {
    const scrollPosition = scrollContainer.scrollLeft;
    updateBackgroundPosition(scrollPosition);
});


let isScrolling = false;
let targetScrollLeft = 0;
let currentScrollLeft = scrollContainer.scrollLeft;

scrollContainer.addEventListener('wheel', function(event) {
    targetScrollLeft = scrollContainer.scrollLeft + event.deltaY * 2;

    event.preventDefault();

    if (!isScrolling) {
        isScrolling = true;

        smoothScroll();
    }
});

function smoothScroll() {
    const scrollSpeed = 80;
    const distanceToScroll = targetScrollLeft - currentScrollLeft;

    if (Math.abs(distanceToScroll) < 1) {
        isScrolling = false;
        return;
    }

    currentScrollLeft += distanceToScroll * 0.1;

    scrollContainer.scrollLeft = currentScrollLeft;

    requestAnimationFrame(smoothScroll);
}



document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.social, .project, .location, .drive, .friend');

    elements.forEach(el => {

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -((mouseY - centerY) / centerY) * 5;
            const rotateY = ((mouseX - centerX) / centerX) * 5;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transition = 'transform 0.3s ease-out';
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';

            setTimeout(() => {
                el.style.transition = '';
            }, 300);
        });

        el.addEventListener('mousedown', () => {
            el.style.transform = 'scale(0.98) rotateX(3deg) rotateY(3deg)';
            el.style.transition = 'transform 0.1s ease';
        });

        el.addEventListener('mouseup', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            el.style.transition = 'transform 0.2s ease';
        });
    });
    
});




document.addEventListener("DOMContentLoaded", () => {
    function handleFadeOut(event) {
        event.preventDefault();

        let href = this.href;

        const elementsToFade = document.querySelectorAll(".scroll-container");
        elementsToFade.forEach(el => el.classList.add("fade-out"));
        window.location.href = href;

    }

    document.querySelectorAll(".location, .back-btn ").forEach(button => { // .social, .project (?)
        button.addEventListener("click", handleFadeOut);
    });
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        const fadeElements = document.querySelectorAll(".fade-out");
        fadeElements.forEach(el => el.classList.remove("fade-out"));
        
        document.body.style.display = 'none';
        setTimeout(function() {
            document.body.style.display = '';
        }, 10);
    }
});

