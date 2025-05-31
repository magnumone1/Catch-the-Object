const btn_level = document.querySelector('.difficulty-btn');
const levels = ['Easy', 'Medium', 'Hard'];
let currentIndex = 0;

btn_level.addEventListener('click', function() {
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
