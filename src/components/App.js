import React, { useState, useEffect } from 'react';
import Modal from 'react-responsive-modal';

import logo from '../img/pokeball.png';

import imgBlastoise from '../img/Blastoise.png';
import imgCharizard from '../img/Charizard.png';
import imgPikachu from '../img/Pikachu.png';

import imgNote from '../img/note.png';
import imgNote1 from '../img/note_1.png';
import imgNote2 from '../img/note_2.png';

import '../styles/App.scss';
import CompetitionForm from './CompetitionForm';

function App() {
  const [gameRecords, setGameRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTipModalOpen, setIsTipOpen] = useState(false);
  const [objNowGameRecord, setNowRecord] = useState(null);
  let cycles = [];
  let semifinals = [];
  let bronzeMedal = [];
  let goldMedal = [];

  let blockCycles = '';
  let blockSemiFinals = '';
  let blockBronzeMedal = '';
  let blockGoldMedal = '';

  let blockTip = (
    <div className="mobile--hide" style={{ overflow: 'auto', marginTop: '25px' }}>
      <img alt="" src={imgNote} />
    </div>
  );

  if (window.innerWidth < 700) {
    blockTip = (
      <div className="desktop--hide" style={{ overflow: 'auto', marginTop: '25px' }}>
        <img className="desktop--hide" alt="" src={imgNote1} />
        <img className="desktop--hide" alt="" src={imgNote2} />
      </div>
    );
  }

  if (gameRecords.length) {
    cycles = gameRecords.filter(gameRecord => gameRecord.type === 'cycle');
    semifinals = gameRecords.filter(gameRecord => gameRecord.type === 'semifinal');
    bronzeMedal = gameRecords.filter(gameRecord => gameRecord.type === 'bronzeMedal');
    goldMedal = gameRecords.filter(gameRecord => gameRecord.type === 'goldMedal');
  }

  function onCloseModal() {
    setNowRecord(null);
  }

  function toggleTipModal() {
    setIsTipOpen(!isTipModalOpen);
  }

  function getTournamentBrackets(records) {
    return records.map(gameRecord => {
      let strClassPlayerOne = 'tournament-bracket__team';
      let strClassPlayerTwo = 'tournament-bracket__team';
      if (gameRecord.scoreOne || gameRecord.scoreTwo) {
        if (gameRecord.scoreOne >= gameRecord.scoreTwo) {
          strClassPlayerOne = 'tournament-bracket__team tournament-bracket__team--winner';
        } else {
          strClassPlayerTwo = 'tournament-bracket__team tournament-bracket__team--winner';
        }
      }
      return (
        <li key={gameRecord.id} className="tournament-bracket__item">
          <div className="tournament-bracket__match" tabIndex="0" onClick={() => { setNowRecord(gameRecord); }}>
            <table className="tournament-bracket__table">
              <caption className="tournament-bracket__caption">
                <time dateTime={gameRecord.date}>{gameRecord.date}</time>
              </caption>
              <thead className="sr-only">
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody className="tournament-bracket__content">
                <tr className={strClassPlayerOne}>
                  <td className="tournament-bracket__country">
                    <abbr className="tournament-bracket__code" title="Russia">{gameRecord.playerOne}</abbr>
                  </td>
                  <td className="tournament-bracket__score">
                    <span className="tournament-bracket__number">{gameRecord.scoreOne}</span>
                  </td>
                </tr>
                <tr className={strClassPlayerTwo}>
                  <td className="tournament-bracket__country">
                    <abbr className="tournament-bracket__code" title="Belarus">{gameRecord.playerTwo}</abbr>
                  </td>
                  <td className="tournament-bracket__score">
                    <span className="tournament-bracket__number">{gameRecord.scoreTwo}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      );
    });
  }

  useEffect(() => {
    if (objNowGameRecord && !isModalOpen) {
      setIsModalOpen(true);
    } else if (!objNowGameRecord) {
      setIsModalOpen(false);
    }
  }, [objNowGameRecord, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      fetch('https://script.google.com/macros/s/AKfycbwi5JFiiC0F82aBsvUjoAyAvKcFn9ZJdRXNyxEuUD5W8tPlhnqr/exec?action=read')
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          if (myJson && myJson.records) {
            // console.log(myJson.records);
            setGameRecords(myJson.records);
          }
        });
    }
  }, [isModalOpen]);

  if (cycles.length) {
    blockCycles = getTournamentBrackets(cycles);
  }

  if (semifinals.length) {
    blockSemiFinals = getTournamentBrackets(semifinals);
  }

  if (bronzeMedal.length) {
    blockBronzeMedal = getTournamentBrackets(bronzeMedal);
  }

  if (goldMedal.length) {
    blockGoldMedal = getTournamentBrackets(goldMedal);
  }

  return (
    <div className="App">
      <Modal
        classNames={{ modal: 'modal--custom', closeButton: 'modal__closeButton', overlay: 'modal__overlay' }}
        open={isTipModalOpen}
        onClose={toggleTipModal}
        center
      >
        {blockTip}
      </Modal>
      <Modal
        classNames={{ modal: 'modal--custom', closeButton: 'modal__closeButton', overlay: 'modal__overlay' }}
        open={isModalOpen}
        onClose={onCloseModal}
        center
      >
        <CompetitionForm
          onCloseModal={onCloseModal}
          data={objNowGameRecord}
        />
      </Modal>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>神奇寶貝之戰</p>
        <span
          role="presentation"
          className="App-link"
          onClick={toggleTipModal}
        >
          準備好，決鬥了，嗎！(秘訣點我)
        </span>
        <div className="pokemons">
          <img alt="水箭龜的姐姐水上漂" src={imgBlastoise} />
          <img alt="皮卡丘的弟弟皮在養" src={imgPikachu} />
          <img alt="噴火龍的妹妹火很大" src={imgCharizard} />
        </div>
      </header>
      <div className="container">
        <h1>
          <img alt="皮卡丘的弟弟皮在養" src={imgPikachu} />
          <span>對戰規則</span>
        </h1>
        <table className="competition__table">
          <tbody>
            <tr>
              <td className="td--first">對戰規則</td>
              <td>
                <span>- 每次對戰三場，決戰日期自訂，由勝利一方回傳資料。</span>
              </td>
            </tr>
            <tr>
              <td className="td--first">預賽</td>
              <td>
                <span>- 採循環賽，勝場數為積分，積分前兩高前進冠軍戰。</span>
                <br />
                <span>- 每次對戰依勝場數取得積分，如三勝得3分、兩勝得2分、依此類推。</span>
              </td>
            </tr>
            <tr>
              <td className="td--first">季/冠軍戰</td>
              <td>
                <span>採淘汰賽，冠軍將得到：</span>
                <br />
                <span>- 神奇寶貝大師之稱號，三天 lol</span>
                <br />
                <span>- 小編 Donate 的超夢一隻XD</span>
              </td>
            </tr>
          </tbody>
        </table>
        <h1>
          <img alt="皮卡丘的弟弟皮在養" src={imgPikachu} />
          <span>賽程</span>
        </h1>
        <hr />
        <div className="tournament-bracket tournament-bracket--rounded">
          <div className="tournament-bracket__round tournament-bracket__round--quarterfinals">
            <h3 className="tournament-bracket__round-title">循環賽</h3>
            <ul className="tournament-bracket__list">
              {blockCycles}
            </ul>
          </div>
          <div className="tournament-bracket__round tournament-bracket__round--semifinals">
            <h3 className="tournament-bracket__round-title">循環賽總積分</h3>
            <ul className="tournament-bracket__list">
              {blockSemiFinals}
            </ul>
          </div>
          <div className="tournament-bracket__round tournament-bracket__round--bronze">
            <h3 className="tournament-bracket__round-title">季軍戰</h3>
            <ul className="tournament-bracket__list">
              {blockBronzeMedal}
            </ul>
          </div>
          <div className="tournament-bracket__round tournament-bracket__round--gold">
            <h3 className="tournament-bracket__round-title">冠軍戰</h3>
            <ul className="tournament-bracket__list">
              {blockGoldMedal}
            </ul>
          </div>
        </div>
      </div>
      <footer>
        <img alt="水箭龜的姐姐水上漂" src={imgBlastoise} />
        <span>ES 100 X Pokemon Master</span>
        <img alt="噴火龍的妹妹火很大" src={imgCharizard} />
      </footer>
    </div>
  );
}

export default App;
