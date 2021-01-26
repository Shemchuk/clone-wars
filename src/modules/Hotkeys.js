// eslint-disable-next-line import/no-cycle
import MenuUtils from './utils/MenuUtils';

export default class Hotkeys {
  constructor() {
    this.currentItem = -1;
    this.buttons = document.querySelectorAll('.main-menu .menu-button ');
    console.log(this.buttons);
  }

  init() {
    this.currentItem = -1;
  }

  setMenuHandler() {
    this.bindedMenuEventHandler = this.menuEventHandler.bind(this);
    this.menuHandler = document.addEventListener('keydown', this.bindedMenuEventHandler);
  }

  removeMenuHandler() {
    this.menuHandler = document.removeEventListener('keydown', this.bindedMenuEventHandler);
  }

  setGameHandler() {
    this.bindedGameEventHandler = this.menuEventHandler.bind(this);
    this.gameHandler = document.addEventListener('keydown', this.bindedGameEventHandler);
  }

  removeGameHandler() {
    this.gameHandler = document.removeEventListener('keydown', this.bindedGameEventHandler);
  }

  menuEventHandler(e) {
    const menuPressUpKey = () => {
      this.currentItem -= 1;
      if (this.currentItem < 0) {
        this.currentItem = this.buttons.length - 1;
      }
      this.disableActiveMenuButtons();
      this.setActiveMenuButton();
    };

    const menuPressDownKey = () => {
      this.currentItem += 1;
      if (this.currentItem === this.buttons.length) {
        this.currentItem = 0;
      }
      this.disableActiveMenuButtons();
      this.setActiveMenuButton();
    };

    const openActiveMenu = () => {
      console.log(`this.currentItem = ${this.currentItem}`);

      switch (this.currentItem) {
        case 0:
          console.log('start');
          this.removeMenuHandler();
          MenuUtils.pressButtonStart();
          break;

        case 1:
          MenuUtils.pressButtonSettings();
          break;

        case 2:
          console.log('tutorial');
          MenuUtils.pressButtonTutorial();
          break;

        case 3:
          MenuUtils.pressButtonResult();
          break;

        default:
          break;
      }
    };

    const goToMainMenu = () => {
      document.querySelectorAll('.menu .section-menu').forEach((item) => {
        const section = item;
        section.classList.add('hide-menu');
      });
      document.querySelector('.main-menu').classList.remove('hide-menu');
    };

    const buttonCode = e.code;
    console.log(buttonCode);

    if (e.stopPropagation) e.stopPropagation();

    switch (buttonCode) {
      case 'Enter':
      case 'Space':
        openActiveMenu();
        break;

      case 'Escape':
        goToMainMenu();
        break;

      case 'ArrowUp':
        menuPressUpKey();
        break;

      case 'ArrowDown':
        menuPressDownKey();
        break;

      default:
        break;
    }
  }

  disableActiveMenuButtons() {
    this.buttons.forEach((button) => {
      const currentButton = button;
      currentButton.dataset.activeMenuItem = false;
    });
  }

  setActiveMenuButton() {
    const button = this.buttons[this.currentItem];
    if (button) {
      button.dataset.activeMenuItem = true;
    }
  }

  setUpGameButton(func) {
    this.upGameButton = func;
  }

  setDownGameButton(func) {
    this.downGameButton = func;
  }

  setEscGameButton(func) {
    this.escGameButton = func;
  }

  gameEventHandler(e) {
    const buttonCode = e.code;
    console.log(buttonCode);

    if (e.stopPropagation) e.stopPropagation();

    switch (buttonCode) {
      case 'Enter':
      case 'Space':
      case 'ArrowUp':
        if (typeof this.upGameButton() === 'function') this.upGameButton();
        break;

      case 'ArrowDown':
        if (typeof this.downGameButton() === 'function') this.downGameButton();
        break;

      case 'Escape':
        if (typeof this.escGameButton() === 'function') this.escGameButton();
        break;

      default:
        break;
    }
  }
}
