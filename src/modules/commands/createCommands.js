import Language from '../lang/Language';

export default class CreateCommands {
  constructor() {
    this.main = document.querySelector('main');
    this.langObject = new Language();
    this.lang = this.langObject.getCurrentLangObject().commandMenu;
  }

  init() {
    let template = '';
    const commandsContainer = document.createElement('div');
    commandsContainer.className = 'command-wrapper';
    template = `<h2>${this.lang.allCommands}</h2>
    <ul class="teams">
      <li>${this.lang.loadingTeams}</li>
    </ul>
    <form class="add-teams">
      <input type="text" name="item" placeholder="${this.lang.teamName}">
      <input type="submit" value="${this.lang.addTeamButton}">
    </form>
    <button class="button-startgame-play">${this.lang.startGameButton}</button>`;
    commandsContainer.innerHTML = template;
    this.main.appendChild(commandsContainer);
    return this.main;
  }
}
