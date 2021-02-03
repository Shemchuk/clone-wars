const menuHTMLTemplate = (lang) => `
<div class="menu">
  <div id="container">
  <div class="sign-wrap">
  <div class="sign">
    <div class="main-menu">
    <div class="player menu__player"></div>
      <button id="button-start" class="menu-button" data-active-menu-item="false"><p><a>
        ${lang.startButton}
      </a></p></button>
      <button id="button-settings" class="menu-button" data-active-menu-item="false"><p><a >${lang.settingsButton}</a></p></button>
      <button id="button-tutorial" class="menu-button" data-active-menu-item="false"><p><a>${lang.tutorialButton}</a></p></button>
      <button id="button-result" class="menu-button" data-active-menu-item="false"><p><a>${lang.resultButton}</a></p></button>
    </div>



  <div class="settings-menu section-menu hide-menu">
    <h2 class="menu-title menu-font"><p><a>${lang.settingsMenuTitle}</a></p></h2>

    <div class="settings-menu__item set__words-number menu-font">
      <p class="setting-paragraph "><a>${lang.labelCountOfWords}</a></p>
      <div class="setting-slider__container slider__words-count menu-font">
        <input
          id="inputWordsCount"
          class="slider-input"
          type="range"
          min="5"
          max="200"
          value="50"
          name="words"
          step="5"
          aria-label="Count of words"
          oninput="outputWordsNumber.value=inputWordsCount.value;"
        />
        <p><a><output
          id="outputWordsNumber"
          class="slider__value-indicator"
          name="output__words-number"
          for="inputWordsCount"
          >60</output
        ></a></p>
      </div>
    </div>

    <div class="settings-menu__item set__round-time menu-font">
      <p class="setting-paragraph"><a>${lang.labelRoundTime}</a></p>
      <div class="setting-slider__container slider__round-time menu-font">
      <input
          id="inputRoundTime"
          class="slider-input"
          type="range"
          min="5"
          max="120"
          value="60"
          name="round-time"
          step="1"
          aria-label="Round time"
          oninput="outputRoundTime.value=inputRoundTime.value;"
        />
        <p><a><output
          id="outputRoundTime"
          class="slider__value-indicator menu-font"
          name="output__words-number"
          for="inputWordsCount"
          >60</output
        ></a></p>
      </div>
    </div>

    <div class="settings-menu__item set__lang">
      <div class="item__row-container menu-font">
        <p class="setting-paragraph"><a>${lang.labelLanguage}</a></p>
        <div class="input__container">
          <input type="radio" id="set-lang__en" name="lang" value="en" checked />
          <label class="small-text" for="set-lang__en"><p><a>ENG &nbsp &nbsp</p></a></label>
          <input type="radio" id="set-lang__ru" name="lang" value="ru" />
          <label class="small-text" for="set-lang__ru"><p><a>RUS</p></a></label>
        </div>
      </div>
    </div>

    <div class="settings-menu__item set__sounds">
    <div class="item__row-container menu-font">
      <p class="setting-paragraph"><a>${lang.labelSounds}</a></p>
      <div class="input__container">
        <input type="radio" id="set-sounds__on" name="sounds" value="true" checked />
        <label for="set-sounds__on"><p><a>
          <span class="material-icons">
            volume_up
          </span>
          &nbsp &nbsp</p></a></label>
        <input type="radio" id="set-sounds__off" name="sounds" value="false" />
        <label for="set-sounds__off"><p><a>
          <span class="material-icons">
          volume_off
          </span>
        </p></a></label>
      </div>
    </div>
  </div>

    <div class="settings__button-block">
      <button id="button-save" class="menu-button"><p><a href="#">${lang.saveButton}</a></p></button>
      <button id="button-back" class="menu-button"><p><a href="#">${lang.backButton}</a></p></button>
    </div>
  </div>

  <div class="tutorial-menu section-menu hide-menu menu-font">
    <h2 class="menu-title"><p><a>${lang.TutorialMenuTitle}</p></a></h2>

    <div class="tutorial-text">
      <h3></h3>
      <p data-title="${lang.essenceTitle}" class="dialog-box_info">
        ${lang.essenceContent}
      </p>
      <p data-title="${lang.pointsTitle}" class="dialog-box_info">
        ${lang.pointsContent}
      </p>
      <p data-title="${lang.winnerTitle}" class="dialog-box_info">
        ${lang.winnerContent}
      </p>
      <p data-title="${lang.hotkeysMenuTitle}" class="dialog-box_info">
        ${lang.hotkeysMenuContent}
      </p>
    </div>

    <div class="tutorial__button-block">
      <button id="tutorial__button-back" class="menu-button"><p><a>${lang.backButton}</a></p></button>
    </div>
  </div>

  <div class="result-menu section-menu hide-menu">
    <h2 class="menu-title menu-font"><p><a>${lang.resultMenuTitle}</a></p></h2>

    <div class="result-table-container">
    <table class="result-table">
      <thead class="result-table__head">
        <tr class="result-table__head-row">
          <th class="result-table__head-row-cell menu-font" data-prop-name="teamName"><p><a>${lang.tableLabelTeam}</a></p></th>
          <th class="result-table__head-row-cell menu-font" data-prop-name="score"><p><a>${lang.tableLabelScore}</a></p></th>
        </tr>
      </thead>
      <tbody class="result-table__body">
        <tr class="result-table__body-row">
          <td class="result-table__body-row-cell"><p class="third-childd point-events-none text-small"><a>Team #1</a></p></td>
          <td class="result-table__body-row-cell menu-font"><p><a>0</a></p></td>
        </tr>
        <tr class="result-table__body-row">
        <td class="result-table__body-row-cell"><p class="third-childd point-events-none text-small"><a>Team #2</a></p></td>
          <td class="result-table__body-row-cell menu-font"><p><a>0</a></p></td>
        </tr>
      </tbody>
    </table>

    </div>

    <div class="result__button-block">
      <button id="result__button-back" class="menu-button"><p><a>${lang.backButton}</a></p></button>
    </div>
  </div>

</div>
</div>
</div>
    </div>
`;

export default menuHTMLTemplate;
