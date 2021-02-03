/* eslint-disable import/no-cycle */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unreachable */
import { gsap } from 'gsap';
import cards from '../cards';
// eslint-disable-next-line import/no-cycle
import { mainGamePlay } from './gameContainer';
import { teams, setNewTime } from './timer';
import Language from '../lang/Language';
import { generateLoardingBeforeMenu } from './loadingBeforeMenu';
import Sound from '../sound/sound';
import Hotkeys from '../Hotkeys';
import Menu from '../Menu';

export let teamFlag = 0;

// Cash arrays for statistics
const arrConfirmed = [];
const arrSkiped = [];
let currentCardsStack;
export let pauseFlag = false;

// For words lang
export let currentWordsLang;

// For hotkeys and audio
const gameHotkeys = new Hotkeys();

// =========== LANG =============== //
// Chose card words lang from langName
function choseCurrentCardsLang() {
  const langName = Language.getCurrentLangName(); // 'en' | 'ru'
  if (langName === 'en') {
    currentWordsLang = 'nameEng';
  } else if (langName === 'ru') {
    currentWordsLang = 'nameRus';
  }
}

// Generate random cards
function shuffleCards() {
  return currentCardsStack.sort(() => Math.round(Math.random() * 100) - 50);
}

// Card
function generateCard() {
  // choseCurrentCardsLang();
  document.querySelector('.card__word').innerHTML = currentCardsStack[i][currentWordsLang];
  i++;
}

// Next round function
function nextRound() {
  document.querySelector('.main').innerHTML = '';
  addGlobalStatisticsTeam(teamFlag, arrConfirmed, arrSkiped);
  arrConfirmed.length = 0;
  arrSkiped.length = 0;
  mainGamePlay();
}
// Add statistics teams in global array-stat
function addGlobalStatisticsTeam(teamIndex, confirmedArr, skipedArr) {
  teams[teamIndex].answers.confirmed.push(...confirmedArr.slice());
  teams[teamIndex].answers.skiped.push(...skipedArr.slice());
}
// Buttons clickhandler
let rotationGradient = 0;

function rotationGameContainer() {
  gsap.to('.game-container__card', { duration: 0.9, rotationX: rotationGradient });
}

let i = 1;

function clickReadyFunc() {
  const sound = new Sound();
  sound.cardClick();
  rotationGradient -= 360;
  teams[teamFlag].points += 1;
  document.querySelector('.card__word').innerHTML = currentCardsStack[0 + i][currentWordsLang];
  arrConfirmed.push(currentCardsStack[i - 1]);
  document.querySelector('.second').innerHTML = teams[teamFlag].points;
  rotationGameContainer();
  i += 1;
}

function clickSkipFunc() {
  const sound = new Sound();
  sound.cardClick();

  rotationGradient += 360;
  document.querySelector('.card__word').innerHTML = currentCardsStack[0 + i][currentWordsLang];
  arrSkiped.push(currentCardsStack[i - 1]);
  rotationGameContainer();
  i += 1;
}

function clickNextRoundFunc() {
  const sound = new Sound();
  sound.nextRoundClick();

  if (teamFlag < teams.length - 1) {
    teamFlag += 1;
  } else {
    teamFlag = 0;
  }
  gsap.to('.team-container__team-name', { duration: 1, ease: 'power1.out', y: -500 });
  gsap.to('.round-stat-modal', { duration: 1, ease: 'power1.out', y: 1000 });
  rotationGradient = 0;
  setTimeout(() => {
    gameHotkeys.removeGameHandler();
    nextRound();
    generateSwiper();
  }, 1000);
}

function clickPauseMenuFunc() {
  const sound = new Sound();
  sound.cardClick();

  document.querySelector('.pause').style.visibility = 'visible';
  pauseFlag = true;

  gsap.from('.pause', { duration: 1, ease: 'power1.out', y: -500 });
}

function clickContainerButtons(e) {
  const clickReady = e.target.closest('.game-container__button_ready');
  const clickSkip = e.target.closest('.game-container__button_skip');
  const clickNextRound = e.target.closest('.round-stat-modal__button');
  const clickCardsForAdults = e.target.closest('.cards__for-adults');
  const clickCardsGeneral = e.target.closest('.cards__main');
  const clickBackToMainMenu = e.target.closest('.back-to-main-menu__button');
  const clickHideFooterButton = e.target.closest('.hide-footer');
  const clickShowFooterButton = e.target.closest('.show-footer');
  const clickPauseMenu = e.target.closest('.pause-menu');
  const clickResume = e.target.closest('.pause__btn_resume');
  const clickMenuBtn = e.target.closest('.pause__btn_menu');

  if (clickReady) {
    clickReadyFunc();
  } else if (clickSkip) {
    clickSkipFunc();
  } else if (clickNextRound) {
    clickNextRoundFunc();
  } else if (clickCardsForAdults) {
    const sound = new Sound();
    sound.mainClick();
    currentCardsStack = cards.forAdults;
    choseCurrentCardsLang();
    shuffleCards();
    gsap.to('.cards__for-adults', { duration: 1, ease: 'power1.out', x: -1000 });
    gsap.to('.cards__main', { duration: 1, ease: 'power1.out', x: 1000 });
    gsap.to('.cards-selection-container__title', { duration: 1, ease: 'power1.out', y: -500 });
    setTimeout(() => {
      document.querySelector('.main').innerHTML = '';
      mainGamePlay();
      generateSwiper();
    }, 1000);
  } else if (clickCardsGeneral) {
    const sound = new Sound();
    sound.mainClick();
    currentCardsStack = cards.main;
    choseCurrentCardsLang();
    gsap.to('.cards__for-adults', { duration: 1, ease: 'power1.out', x: -1000 });
    gsap.to('.cards__main', { duration: 1, ease: 'power1.out', x: 1000 });
    gsap.to('.cards-selection-container__title', { duration: 1, ease: 'power1.out', y: -500 });
    shuffleCards();
    setTimeout(() => {
      document.querySelector('.main').innerHTML = '';
      mainGamePlay();
      generateSwiper();
    }, 1000);
  } else if (clickBackToMainMenu) {
    gameHotkeys.removeGameHandler();
    const sound = new Sound();
    sound.cardClick();
    gsap.to('.finish-game-modal__title', { duration: 1, ease: 'power1.out', y: -500 });
    gsap.to('.finish-modal', { duration: 1, ease: 'power1.out', y: 500 });
    setTimeout(() => {
      document.querySelector('.main').innerHTML = '';
      document.querySelector('.main').appendChild(generateLoardingBeforeMenu());
      document.querySelector('.loading-line').style.display = 'none';
      document.querySelector('#ready').classList.remove('off');
      document.querySelector('#sign').classList.remove('off');
      const menu = new Menu();
      menu.init();
      gsap.from('#sign', { duration: 1, ease: 'power1.out', y: -500 });
      gsap.from('.menu', { duration: 1, ease: 'power1.out', y: 700 });
      shuffleCards();
      teams.length = 0;
      rotationGradient = 0;
      i = 1;
      teamFlag = 0;
      arrConfirmed.length = 0;
      arrSkiped.length = 0;
    }, 1000);
  } else if (clickHideFooterButton) {
    gsap.to('.footer', { duration: 1, ease: 'power1.out', y: 85 });
    document.querySelector('.show-footer').classList.remove('hide');
    document.querySelector('.hide-footer').classList.add('hide');
  } else if (clickShowFooterButton) {
    gsap.to('.footer', { duration: 1, ease: 'power1.out', y: 0 });
    document.querySelector('.show-footer').classList.add('hide');
    document.querySelector('.hide-footer').classList.remove('hide');
  } else if (clickPauseMenu) {
    clickPauseMenuFunc();
  } else if (clickResume) {
    const sound = new Sound();
    sound.mainClick();
    document.querySelector('.pause').style.visibility = 'hidden';
    pauseFlag = false;
  } else if (clickMenuBtn) {
    const sound = new Sound();
    sound.cardClick();
    gameHotkeys.removeGameHandler();
    setNewTime();
    pauseFlag = false;
    document.querySelector('.main').innerHTML = '';
    document.querySelector('.main').appendChild(generateLoardingBeforeMenu());
    document.querySelector('.loading-line').style.display = 'none';
    document.querySelector('#ready').classList.remove('off');
    document.querySelector('#sign').classList.remove('off');
    const menu = new Menu();
    menu.init();
    gsap.from('#sign', { duration: 1, ease: 'power1.out', y: -500 });
    gsap.from('.menu', { duration: 1, ease: 'power1.out', y: 700 });
    shuffleCards();
    teams.length = 0;
    rotationGradient = 0;
    i = 1;
    teamFlag = 0;
    arrConfirmed.length = 0;
    arrSkiped.length = 0;
  }
}

function buttonsClickHandler() {
  const buttonsContainer = document.querySelector('.main');
  const footerHandler = document.querySelector('.footer');
  buttonsContainer.addEventListener('click', clickContainerButtons);
  footerHandler.addEventListener('click', clickContainerButtons);
}
buttonsClickHandler();

// Swiper
function generateSwiper() {
  // eslint-disable-next-line no-undef
  const hammertime = new Hammer(document.querySelector('.game-container__card'), {
    enable: true,
    // eslint-disable-next-line no-undef
    recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_VERTICAL }]],
  });

  hammertime.on('swipeup', () => {
    rotationGradient -= 360;
    teams[teamFlag].points += 1;
    document.querySelector('.card__word').innerHTML = currentCardsStack[0 + i][currentWordsLang];
    arrConfirmed.push(currentCardsStack[0 + i]);
    document.querySelector('.second').innerHTML = teams[teamFlag].points;
    rotationGameContainer();
    i += 1;
  });

  hammertime.on('swipedown', () => {
    rotationGradient += 360;
    document.querySelector('.card__word').innerHTML = currentCardsStack[0 + i][currentWordsLang];
    arrSkiped.push(currentCardsStack[0 + i]);
    rotationGameContainer();
    i += 1;
  });

  gameHotkeys.init();
  gameHotkeys.setGameHandler();
  gameHotkeys.setUpGameButton(clickReadyFunc);
  gameHotkeys.setDownGameButton(clickSkipFunc);
  gameHotkeys.setEscGameButton(clickPauseMenuFunc);
}

function generateSwiperFooter() {
  // eslint-disable-next-line no-undef
  const hammertime = new Hammer(document.querySelector('.footer'), {
    enable: true,
    // eslint-disable-next-line no-undef
    recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_VERTICAL }]],
  });

  hammertime.on('swipedown', () => {
    gsap.to('.footer', { duration: 1, ease: 'power1.out', y: 65 });
    document.querySelector('.show-footer').classList.remove('hide');
    document.querySelector('.hide-footer').classList.add('hide');
  });

  hammertime.on('swipeup', () => {
    gsap.to('.footer', { duration: 1, ease: 'power1.out', y: 0 });
    document.querySelector('.show-footer').classList.add('hide');
    document.querySelector('.hide-footer').classList.remove('hide');
  });
}
generateSwiperFooter();

export { generateCard, shuffleCards, buttonsClickHandler, arrConfirmed, arrSkiped };
