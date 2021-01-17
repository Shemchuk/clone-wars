/* eslint-disable no-undef */
/* eslint-disable no-implied-eval */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
// import generateRoundStatisticsModal from './gameStatistics';
import { teamFlag, arrConfirmed, arrSkiped } from './card';
import { generateConfirmedStatisticsCell, generateSkipedStatisticsCell } from './gameStatistics';
import { generateFinishGameModal } from './gameContainer';
import { set } from '../utils/storage';

// ___________________________________Temporary data______________________________________________
// export const teamNames = ['Team 1', 'Team 2'];
// export const teamPoints = [0,0];
export const teams = [
  { name: 'фыва', points: 0, answers: { confirmed: [], skiped: [] } },
  { name: 'Team2', points: 0, answers: { confirmed: [], skiped: [] } },
];

let timer;
let time = 30;
let finishGamePoints = 10;
function countdown() {
  document.querySelector('.first').innerHTML = time;
  time--;
  if (time <= 0) {
    if (!teams.some((el) => el.points >= finishGamePoints) || !(teamFlag === teams.length - 1)) {
      time = 30;
      clearTimeout(timer);
      // gsap.to('.team-container', { duration: 1, ease: 'power1.out', y: -500 });
      gsap.to('.game-container__card', { duration: 1, ease: 'power1.out', x: -1500 });
      setTimeout(function () {
        document.querySelector('.hidden').style.display = 'flex';
        gsap.from('.hidden', { duration: 1, ease: 'power1.out', x: 1500 });
      }, 1);
      // gsap.from('.hidden', { duration: 1, ease: 'power1.out', y: 500 });
      document.querySelector('.first').innerHTML = 'Время вышло!';
      // console.log(arrConfirmed);
      arrConfirmed.forEach((el) =>
        document
          .querySelector('.round-stat-confirmed__container')
          .appendChild(generateConfirmedStatisticsCell(el))
      );
      arrSkiped.forEach((el) =>
        document
          .querySelector('.round-stat-skiped__container')
          .appendChild(generateSkipedStatisticsCell(el))
      );
    } else {
      teams.sort((el1, el2) => el2.points - el1.points);
      document.querySelector('.main').appendChild(generateFinishGameModal());
      let name = new Date();
      console.log(name);
      set(name, teams);
    }
  } else {
    timer = setTimeout(countdown, 1000);
  }
}

export default countdown;
