const container = document.querySelector('.container');

const colors = [
    'rgb(91,10,7)',
    'rgb(86,35,68)',
    'rgb(20,44,41)',
    'rgb(35,31,73)'
];

let triangleCount = 50;
let initialInterval = 50; 
let normalInterval = 200; 
let trianglesPerInterval = 1; 
let intervalId;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function getColorBasedOnSpeed(baseColor, speed) {
    const minSpeed = 1;  
    const maxSpeed = 3;  
    const speedFactor = (speed - minSpeed) / (maxSpeed - minSpeed);
    const darknessFactor = 1 - speedFactor;  

    const [r, g, b] = baseColor.match(/\d+/g).map(Number);

    const adjustedR = r * (1 - darknessFactor);
    const adjustedG = g * (1 - darknessFactor);
    const adjustedB = b * (1 - darknessFactor);

    return `rgb(${Math.round(adjustedR)}, ${Math.round(adjustedG)}, ${Math.round(adjustedB)})`;
}

function createTriangle() {
    for (let i = 0; i < trianglesPerInterval; i++) {
        const triangle = document.createElement('div');
        triangle.classList.add('triangle');

        const size = Math.random() * 50 + 150; 
        triangle.style.borderLeft = `${size / 2}px solid transparent`;
        triangle.style.borderRight = `${size / 2}px solid transparent`;

        const baseColor = colors[Math.floor(Math.random() * colors.length)];

        triangle.style.borderBottom = `${size * 0.8}px solid ${baseColor}`;

        const randomX = Math.random() * window.innerWidth;
        triangle.style.left = `${randomX - 100}px`;

        triangle.style.bottom = `-${size}px`;

        container.appendChild(triangle);

        animateTriangle(triangle);

        triangleCount++;
    }

    if (triangleCount >= 100) {
        clearInterval(intervalId);
        intervalId = setInterval(createTriangle, normalInterval);
        trianglesPerInterval = 1; 
    }       
}

function animateTriangle(triangle) {
    let position = 0;
    const speed = Math.random() * 2 + 1;  

    const baseColor = colors[Math.floor(Math.random() * colors.length)];

    triangle.style.borderBottomColor = getColorBasedOnSpeed(baseColor, speed);

    const zIndex = Math.round(speed * 100); 
    triangle.style.zIndex = zIndex;

    function move() {
        position += speed;

        const parallaxX = (mouseX - window.innerWidth / 2) * 0.02 * speed;
        const parallaxY = (mouseY - window.innerHeight / 2) * 0.02 * speed;

        triangle.style.transform = `translate(${parallaxX}px, -${position}px)`;

        if (position < window.innerHeight + triangle.clientHeight + 180) {
            requestAnimationFrame(move);
        } else {
            triangle.remove(); 
        }
    }

    requestAnimationFrame(move);
}

function startTriangleGeneration() {
    intervalId = setInterval(createTriangle, initialInterval);
}

function stopTriangleGeneration() {
    clearInterval(intervalId);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopTriangleGeneration();
    } else {
        startTriangleGeneration();
    }
});

startTriangleGeneration(); 
