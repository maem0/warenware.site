function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();

    const options = {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    const timeString = now.toLocaleTimeString('fr-FR', options);

    const dateOptions = {
        timeZone: 'Europe/Paris',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    const dateString = now.toLocaleDateString('fr-FR', dateOptions);

    document.querySelector('.time-info p:last-child').textContent = dateString;
    timeElement.textContent = timeString;
}


setInterval(updateTime, 1000);
updateTime();

function updateClock() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    });

    const parts = formatter.formatToParts(now);
    const getPart = type => parts.find(part => part.type === type)?.value;

    const hours = parseInt(getPart('hour'));
    const minutes = parseInt(getPart('minute'));
    const seconds = parseInt(getPart('second'));

    const secondAngle = seconds * 6;
    const minuteAngle = (minutes + seconds / 60) * 6;
    const hourAngle = (hours % 12 + minutes / 60) * 30;

    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    hourHand.setAttribute('transform', `rotate(${hourAngle} 50 50)`);
    minuteHand.setAttribute('transform', `rotate(${minuteAngle} 50 50)`);
    secondHand.setAttribute('transform', `rotate(${secondAngle} 50 50)`);
}


setInterval(updateClock, 1000);
updateClock();