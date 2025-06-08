const start_screen = document.querySelector('#start-screen');
const gameplay_screen = document.querySelector('#gameplay');
const end_screen = document.querySelector('#end-screen');

const btn_start = document.querySelector('.start-btn');
const btn_level = document.querySelector('.difficulty-btn');
const levels = ['Easy', 'Medium', 'Hard'];
let currentIndex = 0;

btn_level.addEventListener('click', () => {
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

btn_start.addEventListener('click', () => {
	start_screen.style.display = 'none';
	gameplay_screen.style.display = 'flex';
	startTimer();
	spawnObjectsPeriodically();
});

let objectSpawnInterval;
function spawnObjectsPeriodically() {
   objectSpawnInterval = setInterval(() => {
      const obj = spawnObject();
      setTimeout(() => {
         if (gameplay_screen.contains(obj)) {
            obj.remove();
         }
      }, 3500);
   }, 800);
}

function spawnObject() {
   const obj = document.createElement('div');
   obj.classList.add('object');
   const size = 60;
   const maxX = gameplay_screen.offsetWidth - size;
   const maxY = gameplay_screen.offsetHeight - size;
   const x = Math.random() * maxX;
   const y = Math.random() * maxY;
   obj.style.width = size + 'px';
   obj.style.height = size + 'px';
   obj.style.left = x + 'px';
   obj.style.top = y + 'px';

   obj.addEventListener('click', () => obj.remove());

   gameplay_screen.appendChild(obj);
   return obj;
}

let totalSeconds = 60;
let timerInterval;

function startTimer() {
   const timerDisplay = document.querySelector('#game-timer');

   function updateTimer() {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (totalSeconds <= 0) {
         clearInterval(timerInterval);
         clearInterval(objectSpawnInterval);
         endGame();
      } else {
         totalSeconds--;
      }
   }

   updateTimer();
   timerInterval = setInterval(updateTimer, 1000);
}

function endGame() {
   gameplay_screen.style.display = 'none';
   end_screen.style.display = 'block';
}
