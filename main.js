const h2 = document.querySelector('h2');
const second = document.querySelector('.second');
const loss = document.querySelector('#losses');
const guess = document.querySelector('#guess');
const win = document.querySelector('#wins');
const svgs = document.querySelectorAll('svg');
const typer = document.querySelector('audio.type');
const message = document.querySelector('.message')
let choice, word, display, w, losses = 0, wins = 0;

function handleSVG(wrong) {
  for (let i = 0; i < svgs.length; i++) {
    if (i === wrong) {
      svgs[i].style.display = 'inline';
    } else {
      svgs[i].style.display = 'none';
    }
  }
}

function round() {
  const words = ['food', 'drink', 'milk', 'apple', 'butterfly', 'fish', 'donkey', 'green', 'yellow', 'black',
    'computer', 'phone', 'printer', 'pencil', 'rubber', 'face', 'arm', 'hand', 'flower', 'tree'];
  const random = Math.floor(Math.random() * 20);
  choice = words[random];
  word = Array.from(choice);
  display = [];
  w = 0;
  display = word.map(() => '_');
  h2.innerText = 'Click a letter on keyboard';
  guess.innerHTML = `${10 - w}`;
  second.innerHTML = `${display.join(' ')}`;
  handleSVG(w);
}

(function () {
  let letters, c;
  function init() {
    letters = document.getElementById('keyboard').getElementsByTagName('input');
    for (c = 0; c < letters.length; c++) {
      if (letters[c].type === 'button') {
        letters[c].addEventListener('onclick', clickHandler(c));
      }
    }
  }
  function clickHandler(c) {
    letters[c].onclick = function () {
      if (h2.innerText === 'Click a letter on keyboard') h2.innerText = '';
      keyMatch(this.value.toLowerCase());
    };
  }
  window.addEventListener ?
    window.addEventListener('load', init, false) :
    window.attachEvent('onload', init);

})();
round();
function keyMatch(key) {
  typer.play();
  h2.innerText += ' ' + key;
  function showPopup() {
    message.classList.add('active');
    h2.innerText = '';
    setTimeout(() => {
      message.classList.remove('active');
    }, 3000);
  }
  if (choice.includes(key)) {
    word.forEach((letter, index) => {
      if (letter === key) display[index] = key;
    });
    second.innerHTML = `${display.join(' ')}`;
    if (!display.includes('_')) {
      wins++;
      win.innerHTML = `${wins}`;
      message.innerText = `Yes it's ${choice}. You won!!!`;
      showPopup();
      round();
    }
  } else {
    w++;
    guess.innerHTML = `${10 - w}`;
    handleSVG(w);
    if (w === 10) {
      message.innerText = `It was ${choice}. You lost!!!`;
      losses++;
      loss.innerHTML = `${losses}`;
      showPopup();
      round();
    }
  }
}