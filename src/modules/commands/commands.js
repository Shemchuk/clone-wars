import { game } from '../game/gameContainer';
import { addTeamNamesToTeamsArr } from '../game/timer';

export default class Commands {
  constructor() {
    this.addTeams = document.querySelector('.add-teams');
    this.teamsList = document.querySelector('.teams');
    // this.deleteTeam = document.querySelector('.delete-team');
    this.items = JSON.parse(localStorage.getItem('items')) || [];
    this.startGameButton = document.querySelector('.button-startgame-play');
    // this.adjective = ['Ужасный', 'Злобный', 'Сопливый', 'Колючий', 'Опасный', 'Вонючий', 'Черный'];
    // this.race = ['Огр', 'Гном', 'Гоблин', 'Орк', 'Зомби', 'Демон', 'Нежить'];
    // this.name = ['Том', 'Макс', 'Кеша', 'Вася', 'Ваня', 'Петя', 'Саша'];
  }

  init() {
    this.addTeams.addEventListener('submit', this.addItem.bind(this));
    this.teamsList.addEventListener('click', this.deleteItem.bind(this));
    this.populateList(this.items, this.teamsList);
    this.startGameButton.addEventListener('click', function () {
      document.querySelector('.main').innerHTML = '';
      addTeamNamesToTeamsArr();
      game();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  // random(arr) {
  //   const rand = Math.floor(Math.random() * arr.length);
  //   return arr[rand];
  // }

  addItem(e) {
    e.preventDefault();

    const text = this.addTeams.querySelector('[name=item]').value;

    const item = {
      text,
    };

    if (item.text === '') {
      return;
    }

    this.items.push(item);
    this.populateList(this.items, this.teamsList);
    localStorage.removeItem('items');
    localStorage.setItem('items', JSON.stringify(this.items));
    this.addTeams.reset();
  }

  populateList() {
    // if (this.items === []) {
    //   text = `${this.random(this.adjective)} ${this.random(this.race)} ${this.random(this.name)}`;
    // } else {
    this.teamsList.innerHTML = this.items
      .map((el, i) => {
        return `
        <li class="item${i}">${el.text}
          <button class="delete-team${i}" data-index=${i}>delete</button>
        </li>
      `;
      })
      .join('');
  }

  deleteItem(e) {
    const button = e.target.closest('button');

    if (!button) return;

    const { index } = button.dataset;
    this.items.splice(index, 1);

    localStorage.removeItem('items');
    localStorage.setItem('items', JSON.stringify(this.items));
    this.populateList(this.items, this.teamsList);
  }
}
