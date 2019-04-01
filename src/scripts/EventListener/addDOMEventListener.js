import {
  showPlayLevers,
  selectedLevels,
  renderGame,
  scoreCounter
} from '../Ctrl/levelSelector';


export const init = () => {
  const playBtn = document.getElementById('startPlay');
  playBtn.addEventListener('click', showPlayLevers, false);
};

export const levelDOMRegister = () => {
  let demoEvent = document.querySelectorAll('ul li');
  for (let j = 0; j < demoEvent.length; j++) {
    demoEvent[j].addEventListener('click', function (e) {
      return selectedLevels(e);
    });
  }

  let startNow = document.getElementById('startNow');
  startNow.addEventListener('click', renderGame, false);
};


export const tableDOMRegister = () => {
  let demoEvent = document.querySelectorAll('table td');
  for (let j = 0; j < demoEvent.length; j++) {
    demoEvent[j].addEventListener('click', function (e) {
      return scoreCounter(e);
    });
  }
};