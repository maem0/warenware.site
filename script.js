document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.panel');
    let selectedIndex = 0;
    let isTransitioning = false;
    let scrollTimeout = null;

    function updatePanels() {
        isTransitioning = true;
        panels.forEach((panel, index) => {
            const extraContent = panel.querySelector('.extra-content');
            if (index === selectedIndex) {
                panel.classList.add('selected');
                panel.classList.remove('unselected');
                extraContent.style.display = 'block'; 
            } else {
                panel.classList.remove('selected');
                panel.classList.add('unselected');
                extraContent.style.display = 'none'; 
            }
        });
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }
    
    function selectPanel(index) {
        if (isTransitioning) return; 
        selectedIndex = (index + panels.length) % panels.length; 
        updatePanels();
    }

    updatePanels();

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            selectPanel(selectedIndex - 1);
        } else if (event.key === 'ArrowDown') {
            selectPanel(selectedIndex + 1);
        }
    });

    document.addEventListener('wheel', (event) => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (event.deltaY < 0) {
                selectPanel(selectedIndex - 1);
            } else {
                selectPanel(selectedIndex + 1);
            }
        }, 100); 
    });

    panels.forEach((panel, index) => {
        panel.addEventListener('click', () => {
            selectPanel(index);
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            selectPanel(selectedIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            selectPanel(selectedIndex - 1);
        }
    }
});


function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();

    const gmtPlusTwo = new Date(now.getTime() + (2 * 60 * 60 * 1000));

    const hours = String(gmtPlusTwo.getUTCHours()).padStart(2, '0');
    const minutes = String(gmtPlusTwo.getUTCMinutes()).padStart(2, '0');

    const timeString = `${hours}:${minutes}`;

    clockElement.textContent = timeString;
}

setInterval(updateClock, 1000); 
updateClock(); 