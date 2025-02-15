function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();

    const gmtPlusTwo = new Date(now.getTime() + (2 * 60 * 60 * 1000));

    const hours = String(gmtPlusTwo.getUTCHours()).padStart(2, '0');
    const minutes = String(gmtPlusTwo.getUTCMinutes()).padStart(2, '0');

    const timeString = `${hours}:${minutes}`;

    const day = gmtPlusTwo.getDate();
    const month = gmtPlusTwo.toLocaleString('default', {
        month: 'long'
    });
    const year = gmtPlusTwo.getFullYear();
    const dateString = `${day} ${month} ${year}`;

    document.querySelector('.time-info p:last-child').textContent = dateString;
    timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

function updateClock() {
    const now = new Date();

    const utcOffsetInHours = 1;
    const utcTime = new Date(now.getTime() + utcOffsetInHours * 60 * 60 * 1000);

    const seconds = utcTime.getUTCSeconds();
    const minutes = utcTime.getUTCMinutes();
    const hours = utcTime.getUTCHours();

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