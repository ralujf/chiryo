/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
<reference types="cypress" />;

describe('sign up process', () => {
  it('answer all questions to sign up to a user', () => {
    cy.visit('/questionnaire');

    // Q1
    cy.get('[data-cy="question"]').should(
      'have.value',
      'How are you feeling today?',
    );
    cy.get('[data-cy="response"]').type('I am feeling neutral');
    cy.get('[data-cy="response"]').should('have.value', 'I am feeling neutral');
    cy.get('[data-cy="submit-answer"]').click();

    // Q2
    cy.get('[data-cy="question"]').should(
      'have.value',
      'When was the last time you had an episode?',
    );
    cy.get('[data-cy="response"]').type('A very long time ago');
    cy.get('[data-cy="response"]').should('have.value', 'A very long time ago');
    cy.get('[data-cy="submit-answer"]').click();

    // Q3
    cy.get('[data-cy="question"]').should(
      'have.value',
      'Do you ever feel like you are alone or have no one to talk to?',
    );
    cy.get('[data-cy="response"]').type('No');
    cy.get('[data-cy="response"]').should('have.value', 'No');
    cy.get('[data-cy="submit-answer"]').click();

    // Q4
    cy.get('[data-cy="question"]').should(
      'have.value',
      'If there was anything that you could have right now, what would it be?',
    );
    cy.get('[data-cy="response"]').type('Peace');
    cy.get('[data-cy="response"]').should('have.value', 'Peace');
    cy.get('[data-cy="submit-answer"]').click();

    // Q5
    cy.get('[data-cy="question"]').should(
      'have.value',
      'What do you like to do in your free time?',
    );
    cy.get('[data-cy="response"]').type('Code');
    cy.get('[data-cy="response"]').should('have.value', 'Code');
    cy.get('[data-cy="submit-answer"]').click();

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
