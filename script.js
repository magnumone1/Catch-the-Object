const start_screen = document.querySelector('#start-screen');
const gameplay_screen = document.querySelector('#gameplay');
const end_screen = document.querySelector('#end-screen');

const btn_start = document.querySelector('.start-btn');
const btn_level = document.querySelector('.difficulty-btn');
const levels = ['Easy', 'Medium', 'Hard'];
let currentIndex = 0;

const scoreDisplay = document.querySelector('#score');
const timerDisplay = document.querySelector('#game-timer');
const finalScoreDisplay = document.querySelector('#final-score');
const restartBtn = document.querySelector('#restart-btn');

const soundStar = document.getElementById('sound-star');
const soundMeteorit = document.getElementById('sound-meteorit');
const soundComet = document.getElementById('sound-comet');

let score = 0;
let totalSeconds = 60;
let timerInterval;
let objectSpawnInterval;

btn_level.addEventListener('click', () => {   // Змінює рівень складності
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

btn_start.addEventListener('click', () => {   // Запускає гру
	start_screen.style.display = 'none';
	end_screen.style.display = 'none';
	gameplay_screen.style.display = 'flex';
	score = 0;
	totalSeconds = 60;
	updateScore();
	startTimer();
	spawnObjectsPeriodically();
});

function spawnObjectsPeriodically() {   // Створює об'єкти через проміжок часу
   objectSpawnInterval = setInterval(() => {
      const obj = spawnObject();
      setTimeout(() => {   // Видаляє об'єкт, якщо він не був спійманий
         if (gameplay_screen.contains(obj)) {
            obj.remove();
         }
      }, 3500);
   }, 800);
}

function spawnObject() {   // Створює новий об'єкт
   const obj = document.createElement('div');
   obj.classList.add('object');

   const rand = Math.random();
   let type;
   if (rand < 0.6) {
      type = 'star';
      obj.style.backgroundImage = "url('images/star.png')";
   } else if (rand < 0.9) {
      type = 'meteorit';
      obj.style.backgroundImage = "url('images/meteorit.png')";
   } else {
      type = 'comet';
      obj.style.backgroundImage = "url('images/comet.png')";
   }
   obj.classList.add(type);

   const size = 60;
   const maxX = gameplay_screen.offsetWidth - size;
   const maxY = gameplay_screen.offsetHeight - size;
   const x = Math.random() * maxX;
   const y = Math.random() * maxY;
   obj.style.width = size + 'px';
   obj.style.height = size + 'px';
   obj.style.left = x + 'px';
   obj.style.top = y + 'px';

   gameplay_screen.appendChild(obj);

   anime ({
      targets: obj,
      scale: [0.3, 1],
      opacity: [0, 1],
      rotate: [`${Math.random() * 90 - 45}deg`, `${Math.random() * 90 + 45}deg`],
      easing: 'easeOutBack',
      duration: 500,
   });

   obj.addEventListener('click', function() {
      if(type === 'star'){
         console.log('Clicked star');
         soundStar.pause();
         soundStar.currentTime = 0;
         soundStar.play().catch(e => console.log('Star sound error:', e));
         score += 1;
      } else if(type === 'meteorit'){
         console.log('Clicked meteorit');
         soundMeteorit.pause();
         soundMeteorit.currentTime = 0;
         soundMeteorit.play().catch(e => console.log('Meteorit sound error:', e));
         score -= 3;
      } else if(type === 'comet'){
         console.log('Clicked comet');
         soundComet.pause();
         soundComet.currentTime = 0;
         soundComet.play().catch(e => console.log('Comet sound error:', e));
         totalSeconds += 5;
         slowMotionEffect();
      }

      updateScore();

      anime ({
         targets: obj,
         scale: 0,
         opacity: 0,
         duration: 400,
         easing: 'easeInBack',
         complete: function() {
            obj.remove();
         }
      });
   });

   return obj;
}

function updateScore() {
   scoreDisplay.textContent = `Очки: ${score}`;
}

function startTimer() {
   function updateTimer() {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (totalSeconds <= 0) {
         endGame();
      } else {
         totalSeconds--;
      }
   }

   updateTimer();
   timerInterval = setInterval(updateTimer, 1000);
}

function slowMotionEffect(duration = 3000, factor = 0.5) {
   console.log('Start slow motion');
   clearInterval(objectSpawnInterval);

   const slowedInterval = 800 / factor;

   objectSpawnInterval = setInterval(() => {
      const obj = spawnObject();
      setTimeout(() => {
         if (gameplay_screen.contains(obj)) {
            obj.remove();
         }
      }, 3500 / factor);
   }, slowedInterval);

   setTimeout(() => {
      console.log('End slow motion');
      clearInterval(objectSpawnInterval);
      spawnObjectsPeriodically();
   }, duration);
}

function endGame() {
   clearInterval(timerInterval);
   clearInterval(objectSpawnInterval);

   gameplay_screen.style.display = 'none';
   end_screen.style.display = 'flex';

   finalScoreDisplay.textContent = `Ваш рахунок: ${score}`;
}

restartBtn.addEventListener('click', () => {
   end_screen.style.display = 'none';
   start_screen.style.display = 'flex';
});
