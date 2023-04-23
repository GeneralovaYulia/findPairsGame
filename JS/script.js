document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const timerBlock = document.querySelector('.timer');
  const retryBtn = document.querySelector('.retry__btn');

  let cardsNumberArray = [];
  let width;
  let height;
  let firstCard = null;
  let secondCard = null;
  let currentOpened = 0;
  let array;
  let countCards = 8;
  let flag = false;
  const cardsIcons = [
    './img/1.png', './img/2.png', './img/3.png',
    './img/4.png', './img/5.png', './img/6.png',
    './img/7.png', './img/8.png', './img/9.png',
    './img/10.png', './img/11.png', './img/12.png',
    './img/13.png', './img/14.png', './img/15.png',
    './img/16.png', './img/17.png', './img/18.png',
    './img/19.png', './img/20.png', './img/21.png',
    './img/22.png', './img/23.png', './img/24.png',
    './img/25.png'
  ];

  class Card {
    _open = false;
    _success = false;
    _cardNumber;

    constructor(container, cardNumber, flip) {
      this.container = container;
      this.cardNumber = cardNumber;
      this.flip = flip;
    }

    createElement() {
      const card = document.createElement('button');

      this.cardElement = card;
      this.cardElement.textContent = this.cardNumber;
      this.cardElement.classList.add('card__item');
      this.cardElement.style.width = width;
      this.cardElement.style.height = height;

      this.cardElement.addEventListener('click', () => {
        if (this.open == false && this.success == false) {
          if (currentOpened < 2) {
            this.open = true;
            flip(this);
          };
        }
      })

      return card;
    }

    set cardNumber(value) {
      this._cardNumber = value;
      if (this.cardElement)
        this.cardElement.textContent = value;
    }

    get cardNumber() {
      return this._cardNumber;
    }

    set open(value) {
      this._open = value;
      if (value) {
        this.cardElement.classList.add('opened');
      } else {
        this.cardElement.classList.remove('opened');
      }
    }

    get open() {
      return this._open;
    }

    set success(value) {
      this._success = value;
      if (value) {
        this.cardElement.classList.add('success');
      } else {
        this.cardElement.classList.remove('success');
      }
    }

    get success() {
      return this._success;
    }
  }

  class AmazingCard extends Card {
    set cardNumber(value) {
      const img = document.createElement('img');
      img.src = `${value}`;

      this._cardNumber = `<img src="${img.src}" class ="pic"></img>`;

      img.onerror = function () {
        alert("Ошибка загрузки" + this.src);
      }
    }

    get cardNumber() {
      return this._cardNumber;
    }

    createElement() {
      super.createElement();

      this.cardElement.innerHTML = this.cardNumber;

      return this.cardElement;
    }
  }

  let radios = document.querySelectorAll('input[type="radio"]');
  let button = document.getElementById('button');

  button.addEventListener('click', function (e) {
    e.preventDefault();

    container.innerHTML = '';
    cardsNumberArray = [];
    clearInterval(timer);
    flag = false;

    for (let radio of radios) {
      if (radio.checked) {
        if (radio.value === '1') {
          countCards = 8;
          array = cardsIcons.slice(0, countCards);
          timerBlock.textContent = '60';
          createNumbersArr(array);
          createGameTable(countCards);
        }
        if (radio.value === '2') {
          countCards = 18;
          array = cardsIcons.slice(0, countCards);
          timerBlock.textContent = '120';
          createNumbersArr(array);
          createGameTable(countCards);
        }
        if (radio.value === '3') {
          countCards = 32;
          array = cardsIcons.slice(0, countCards / 2);
          array = array.concat(array);
          timerBlock.textContent = '240';
          createNumbersArr(array);
          createGameTable(countCards);
        }
        if (radio.value === '4') {
          countCards = 50;
          array = cardsIcons.slice(0, countCards / 2);
          array = array.concat(array);
          timerBlock.textContent = '460';
          createNumbersArr(array);
          createGameTable(countCards);
        }
      }
    }
  });

  // дефолтная отрисовка поля
  function createNewGame() {
    countCards = 8;
    array = cardsIcons.slice(0, countCards);
    timerBlock.textContent = '60';
    createNumbersArr(array);
    createGameTable(countCards);
  };

  createNewGame();

  // создаем массив
  function createNumbersArr(array) {
    cardsNumberArray = [...array];
    cardsNumberArray = cardsNumberArray.concat(cardsNumberArray);
    shuffle(cardsNumberArray);

    return cardsNumberArray;
  };

  // перемешиваем массив
  function shuffle(cardsNumberArray) {
    for (let i = cardsNumberArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cardsNumberArray[i], cardsNumberArray[j]] = [cardsNumberArray[j], cardsNumberArray[i]];
    }
  };

  // создаем игровое поле
  function createGameTable(countCards) {
    for (const cardNumber of cardsNumberArray) {
      if (countCards === 8 || countCards === undefined) {
        container.style.width = '400px';
        container.style.height = '400px';
        width = 'calc(25% - 1px)';
        height = 'calc(25% - 1px)';
      }
      if (countCards === 18) {
        container.style.width = '600px';
        container.style.height = '600px';
        width = 'calc(16.5% - 1px)';
        height = 'calc(16.5% - 1px)';
      }
      if (countCards === 32) {
        container.style.width = '600px';
        container.style.height = '600px';
        width = 'calc(12.5% - 1px)';
        height = 'calc(12.5% - 1px)';
      }
      if (countCards === 50) {
        container.style.width = '600px';
        container.style.height = '600px';
        width = 'calc(10% - 1px)';
        height = 'calc(10% - 1px)';
      }

      let card = new AmazingCard(container, cardNumber, flip);

      container.append(card.createElement());
    }
  };

  function flip(currentCard) {

    initialTimer();
    flag = true;

    currentOpened += 1;

    if (firstCard == null) {
      firstCard = currentCard;
    } else {
      if (secondCard == null) {
        secondCard = currentCard;
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.cardNumber === secondCard.cardNumber) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
        currentOpened = 0;
      } else {
        setTimeout(() => {
          firstCard.open = false;
          secondCard.open = false;
          firstCard = null;
          secondCard = null;
          currentOpened = 0;
        }, 1000);
      }

    };

    if (document.querySelectorAll('.success').length == cardsNumberArray.length) {
      setGameWin();
    };
  };

  let count;
  let timer;

  function initialTimer(time) {
      if (flag === true) return;
      clearInterval(timer);
      count = timerBlock.textContent;
      timer = setInterval(() => {
      count = count--;
      timerBlock.textContent = count--;
        if (count === 0) {
          disableAllCards();
          clearInterval(timer);
          timerBlock.textContent = 'End!';
          flag = false;
          setTimeout(() => {
            retryBtn.style.visibility = 'visible';
            retryBtn.addEventListener('click', function () {
              container.innerHTML = '';
              cardsNumberArray = [];
              createNewGame();
              retryBtn.style.visibility = 'hidden';
              timerBlock.style.color = 'aliceblue';
            });
          }, 500);
        }
        if (document.querySelectorAll('.success').length == cardsNumberArray.length) {
          clearInterval(timer);
          timerBlock.textContent = 'Win!'
          timerBlock.style.color = 'red';
          flag = false;
            return;
        }
      }, 1000);
  }

  function disableAllCards() {
    let cards = document.querySelectorAll('.card__item');
    cards.forEach(card => {
        card.disabled = true;
    })
}

  function setGameWin() {
    timerBlock.textContent = 'Win!';
    timerBlock.style.color = 'red';
    retryBtn.style.visibility = 'visible';
    retryBtn.addEventListener('click', function () {
      container.innerHTML = '';
      cardsNumberArray = [];
      createNewGame();
      retryBtn.style.visibility = 'hidden';
      timerBlock.style.color = 'aliceblue';
    });
  };
})
