import {COMMON} from '../Utils/Constants';

export const disableBtn = (id) => {
  let getDOMElement = document.getElementById(id);  
  getDOMElement.className !== "disabled" ? getDOMElement.className = "diabled" : "";
};

export const enableBtn = (id) => {
  let getDOMElement = document.getElementById(id);  
  getDOMElement.className === "disabled" ? getDOMElement.className = "" : "";
};


export const getHighScore = level => {
  let score = localStorage.getItem(COMMON().HIGN_SCORE + level) || 0;
  return score;
};

export const setHighScore = (level, score) => {
  let s = localStorage.setItem(COMMON().HIGN_SCORE + level, score);
  return s;
};