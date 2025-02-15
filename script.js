const scrollContainer = document.querySelector('.scroll-container');

function updateBackgroundPosition(scrollPosition) {
   const isMobile = window.innerWidth <= 768;
   if (isMobile) {
      document.body.style.backgroundPosition = `${-scrollPosition * 0.12 - 500}px center`;
   } else {
      document.body.style.backgroundPosition = `${-scrollPosition * 0.2}px center`;
   }
}

scrollContainer.addEventListener('wheel', function (event) {
   if (event.deltaY !== 0) {
      scrollContainer.scrollLeft += event.deltaY;
      event.preventDefault();
   }
});

scrollContainer.addEventListener('scroll', function () {
   const scrollPosition = scrollContainer.scrollLeft;
   updateBackgroundPosition(scrollPosition);
});

window.addEventListener('resize', function () {
   const scrollPosition = scrollContainer.scrollLeft;
   updateBackgroundPosition(scrollPosition);
});


let isScrolling = false;
let targetScrollLeft = 0;
let currentScrollLeft = scrollContainer.scrollLeft;

scrollContainer.addEventListener('wheel', function (event) {
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

document.addEventListener('DOMContentLoaded', () => {
   const elements = document.querySelectorAll('.social, .project, .location');

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
   document.querySelectorAll("a.scale-link").forEach(link => {
       link.addEventListener("click", function(event) {
           event.preventDefault(); 
           let href = this.href; 

           const viewportWidth = window.innerWidth;
           const viewportHeight = window.innerHeight;

           let clone = this.cloneNode(true);
           document.body.appendChild(clone);
           
           setTimeout(() => {
            this.style.visibility = "hidden";
        }, 50); 
           let rect = this.getBoundingClientRect();
           clone.style.position = "fixed";
           clone.style.top = `${rect.top}px`;
           clone.style.left = `${rect.left}px`;
           clone.style.width = `${rect.width}px`;
           clone.style.height = `${rect.height}px`;
           clone.style.zIndex = "9999";
           clone.style.overflow = "hidden";
           clone.style.display = "flex";
           clone.style.alignItems = "center";
           clone.style.justifyContent = "center";

           clone.innerHTML = "";

           clone.classList.add("metro-zoom");

           setTimeout(() => {
               window.location.href = href;
           }, 2000); 
       });
   });
});

