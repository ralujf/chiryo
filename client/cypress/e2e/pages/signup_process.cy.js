/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
<reference types="cypress" />;

describe('sign up process', () => {
  it('answer all questions to sign up to a user', () => {
    cy.visit('/questionnaire');

    cy.get('[data-cy="question"]').should(
      'have.value',
      'How are you feeling today?',
    );
    cy.get('[data-cy="response"]').type('I am feeling neutral');
    cy.get('[data-cy="response"]').should('have.value', 'I am feeling neutral');
    cy.get('[data-cy="submit-answer"]').click();
    // Q2

    // Question Complete
    cy.get('[data-cy="email"]').type('test@gmail.com');
    cy.get('[data-cy="age"]').type('25');
    cy.get('[data-cy="race"]').select('black');
    cy.get('[data-cy="ethnic-background"]').select('european');
    cy.get('[data-cy="religion"]').select('other');
    cy.get('[data-cy="location"]').select('London');

    // Complete
    cy.contains('Your account details are...');
    cy.get('[data-cy="login-link"]').click();
  });
});
