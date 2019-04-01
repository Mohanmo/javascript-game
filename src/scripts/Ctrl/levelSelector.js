'use strict';
window.counter = 0;
import {
  getPlayLevels
} from '../Modal/loadLevelSeletor';
import {
  levelDOMRegister,
  tableDOMRegister
} from '../EventListener/addDOMEventListener';
import {
  disableBtn,
  enableBtn,
  getHighScore,
  setHighScore
} from '../Utils/utils';
import {
  COMMON
} from '../Utils/Constants';

export const renderLevelList = () => {
  let getLevelsData = getPlayLevels().playLevels;
  let appendUIDOM = document.getElementsByClassName('selection-container-list')[0];
  let createUL = document.createElement('ul');
  createUL.className = 'selection-container-list__ul';
  for (let i = 0; i < getLevelsData.length; i++) {
    var createLI = document.createElement('li');
    createLI.dataset.levelName = `${getLevelsData[i].levelName}`;
    createLI.dataset.levelSize = `${getLevelsData[i].sizeOf}`;
    createLI.style.backgroundColor = `${getLevelsData[i].backgroudColor}`;
    createLI.style.color = `${getLevelsData[i].color}`;
    createLI.innerHTML = `${getLevelsData[i].levelName}`;
    createUL.appendChild(createLI);
  }
  appendUIDOM.append(createUL);
  return levelDOMRegister();
};

export const showPlayLevers = () => {
  let welcomeContainer = document.getElementsByClassName('welcome-container')[0];
  let selectionContainer = document.getElementsByClassName('selection-container')[0];
  welcomeContainer.style.display = 'none';
  selectionContainer.style.display = 'block';
  return renderLevelList();
};

export const selectedLevels = (e) => {
  let level = e.target.dataset.levelName;
  let size = e.target.dataset.levelSize;
  if (level && size) {
    enableBtn('startNow');
  } else {
    return;
  };
  sessionStorage.setItem(COMMON().GET_LEVEL, level);
  sessionStorage.setItem(COMMON().GET_SIZE, size);
};

export const renderGame = () => {
  let selectionContainer = document.getElementsByClassName('selection-container')[0];
  let playContainer = document.getElementsByClassName('play-container')[0];
  selectionContainer.style.display = 'none';
  playContainer.style.display = 'block';
  return startGame();
};

export const colorChanges = () => {
  let playHighScoreBgColor = document.querySelectorAll('.play-high-score');
  let getLevelsData = getPlayLevels().playLevels;
  let bgcolor = getLevelsData.filter(obj => {
    if (obj.levelName == sessionStorage.getItem(COMMON().GET_LEVEL)) {
      return obj;
    }
  });
  playHighScoreBgColor.forEach((data) => {
    data.style.background = bgcolor[0].backgroudColor;
    data.style.color = bgcolor[0].color;
  });
};

export const startGame = () => {
  let playTimer = document.getElementsByClassName('play-timer')[0];
  let reStartNow = document.getElementById('reStartNow');
  let counterElement = document.getElementsByClassName('score-count')[0];
  let highScore = document.getElementsByClassName('high-score-count')[0];
  let playLevelName = document.getElementsByClassName('play-level-name')[0];
  let highScoreCount =  getHighScore(sessionStorage.getItem(COMMON().GET_LEVEL));
  highScore.innerHTML = highScoreCount;
  counterElement.innerHTML = 0;
  reStartNow.style.visibility = 'hidden';
  playLevelName.innerHTML = sessionStorage.getItem(COMMON().GET_LEVEL);
  window.counter = 0;
  let timeCount = 300;
  colorChanges();
  renderTable();

  let startNow = setInterval(() => {
    playTimer.innerHTML = `REMAINING SECONDS:${timeCount--}s `;
    renderTable();
  }, 1000);

  setTimeout(() => {
    clearInterval(startNow);
    alert('Game Over!!!');
    reStartNow.addEventListener('click', startGame, false);
    reStartNow.style.visibility = 'visible';
  }, 300000);
};

export const renderTable = activeCell => {
  let size = sessionStorage.getItem(COMMON().GET_SIZE);
  let playContainerTable = document.getElementsByClassName('play-container-table')[0];
  playContainerTable.innerHTML = '';
  let rows = getRandom(size);
  let columns = getRandom(size);
  let board = document.createElement("table");
  board.className = 'table-container';
  for (let i = 0; i < size; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < size; j++) {
      let td = document.createElement('td');
      if (i === rows && j === columns) {
        td.className = "active";
        td.dataset.active = 'true';
        td.dataset.rows = rows;
        td.dataset.columns = columns;
        window.rows = rows;
        window.columns = columns;
      } else {
        td.dataset.active = 'false';
      }
      tr.appendChild(td);
    }
    board.appendChild(tr);
  }
  playContainerTable.append(board);
  tableDOMRegister();
};

export const getRandom = max => {
  return Math.floor(Math.random() * Math.floor(max));
};


export const scoreCounter = (e) => {
  let isActive = e.target.dataset.active;
  let rows = e.target.dataset.rows;
  let columns = e.target.dataset.columns;
  let counterElement = document.getElementsByClassName('score-count')[0];
  let highScore = document.getElementsByClassName('high-score-count')[0];
  let highScoreCount = getHighScore(sessionStorage.getItem(COMMON().GET_LEVEL));
  highScore.innerHTML = highScoreCount;
  if (isActive === 'true' && window.rows == rows && window.columns == columns) {
    window.counter++;
    window.counter > highScoreCount ? highScoreCount = window.counter : '';
    setHighScore(sessionStorage.getItem(COMMON().GET_LEVEL), highScoreCount);
    highScore.innerHTML = highScoreCount;
    counterElement.innerHTML = window.counter;
  } else {
    window.counter > 0 ? window.counter-- : window.counter = 0;
    counterElement.innerHTML = window.counter;
    highScore.innerHTML = highScoreCount;
  }
};