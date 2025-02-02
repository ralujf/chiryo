/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
<reference types="cypress" />;

describe('App Routes', () => {
  it('should render the Main page', () => {
    cy.visit('/');
    cy.contains('Find a Therapist').should('be.visible');
  });

  it('should render the Application page', () => {
    cy.visit('/become-a-therapist');
    cy.contains('Application Form').should('be.visible');
  });

  it('should render the Dashboard page', () => {
    cy.visit('/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('should render the Questionnaire page', () => {
    cy.visit('/questionnaire');
    cy.contains('Next').should('be.visible');
  });

  it('should render the Login page', () => {
    cy.visit('/login');
    cy.contains('Login').should('be.visible');
  });

  it('should render the About page', () => {
    cy.visit('/about');
    cy.contains('About').should('be.visible');
  });

  it('should render the User Info page', () => {
    cy.visit('/info');
    cy.contains('User Info').should('be.visible');
  });

  it('should render the Therapist Info page', () => {
    cy.visit('/become-a-therapist/info');
    cy.contains('Therapist Info').should('be.visible');
  });

  it('should render the 404 page for unknown routes', () => {
    cy.visit('/unknown-route', { failOnStatusCode: false });
    cy.contains('404: No Page Here Boss').should('be.visible');
  });
});
