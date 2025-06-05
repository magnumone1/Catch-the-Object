const start_screen = document.querySelector('#start-screen');
const gameplay_screen = document.querySelector('#gameplay');
const end_screen = document.querySelector('#end-screen');

const btn_level = document.querySelector('.difficulty-btn');
const levels = ['Easy', 'Medium', 'Hard'];
let currentIndex = 0;

btn_level.addEventListener('click', function() {   // Змінює рівень складності
	currentIndex = (currentIndex + 1) % levels.length;
	btn_level.textContent = levels[currentIndex];
});

anime({
  targets: '.moon',
  rotate: '360deg',
  duration: 100000,
  easing: 'linear',
  loop: true
});


const btn_start = document.querySelector('.start-btn');

btn_start.addEventListener('click', function() {   // Запускає гру
	start_screen.style.display = 'none';
	gameplay_screen.style.display = 'flex';
   spawnObjectsPeriodically();
});


function spawnObjectsPeriodically() {   // Створює об'єкти через проміжок часу
   setInterval(function() {
      const obj = spawnObject();

      setTimeout(function() {   // Видаляє об'єкт, якщо він не був спійманий
         if (gameplay_screen.contains(obj)) {
            obj.remove();
         }
      }, 3500);
   }, 800);
}


function spawnObject() {   // Створює новий об'єкт
   const obj = document.createElement('div');
   obj.classList.add('object');

   // Випадкові координати
   const size = 60;
   const maxX = gameplay_screen.offsetWidth - size;
   const maxY = gameplay_screen.offsetHeight - size;
   const x = Math.random() * maxX;
   const y = Math.random() * maxY;
   obj.style.width = size + 'px';
   obj.style.height = size + 'px';
   obj.style.left = x + 'px';
   obj.style.top = y + 'px';

   obj.addEventListener('click', function() {   // При кліку об'єкт зникає
      obj.remove();
   });

   gameplay_screen.appendChild(obj);
   return obj;
}