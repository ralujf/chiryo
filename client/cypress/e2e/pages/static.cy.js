/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
<reference types="cypress" />;
// Static pages test suite
describe('static pages function correctly', () => {
  it('should render all components on the page', () => {
    cy.visit('/');
  });
});
