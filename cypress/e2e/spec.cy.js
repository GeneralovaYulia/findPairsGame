/// <reference types="cypress" />

describe('тестирование игры пары', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('В начальном состоянии игра имеeт поле четыре на четыре клетки, символы на клетках скрыты', () => {
    cy.get('.container button').should('have.length', 16);
    cy.get('.container img').should('have.class', 'pic');
  });

  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой', () => {
    cy.get('.container button').click({ multiple: true });
    cy.get('.container button').should('have.class', 'opened');
  });

  it('Найти пару', () => {
    let counter = 1;

    function clickCards(cards) {
      cy.get(cards[0]).click();
      cy.get(cards[counter]).click();

      if (cards[0].innerHTML === cards[counter].innerHTML) {
        cy.get(cards[0]).should('have.class', 'success');
        cy.get(cards[counter]).should('have.class', 'success');
        cy.get(cards[0]).should('have.class', 'opened');
        cy.get(cards[counter]).should('have.class', 'opened');
      } else {
        counter++;
        cy.wait(1000, { log: false });
        clickCards(cards);
      }
    }

    cy.get('.container button').then(($cards) => {
      clickCards($cards);
    });
  });

  it('Найти не пару', () => {
    let count = 3;

    cy.get('.container button').then(($cards) => {
      clickCards($cards);
    });

    function clickCards(cards) {
      cy.get(cards[0]).click();
      cy.get(cards[1]).click();

      if (cards[0].innerHTML === cards[1].innerHTML) {
        cy.wait(1000, { log: false });
        clickCard(cards);
      } else {
        cy.get(cards[0]).should('not.have.class', 'opened');
        cy.get(cards[1]).should('not.have.class', 'opened');
      }
    }

    function clickCard(cards) {
      cy.get(cards[2]).click();
      cy.get(cards[count]).click();

      if (cards[2].innerHTML !== cards[count].innerHTML) {
        cy.get(cards[2]).should('not.have.class', 'opened');
        cy.get(cards[count]).should('not.have.class', 'opened');
        count++;
        cy.wait(1000, { log: false });
        clickCard(cards);
      }
    }
  });
});
