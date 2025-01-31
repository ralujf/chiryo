import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Application from '../views/application';

describe('Application form tests', () => {
  test('if it displays the application form for therapists to apply', () => {
    const testMessage = 'Not in document';
    render(<Application />);
    expect(screen.queryByText(testMessage)).toBeNull();
  });
  test('that the application renders correctly', () => {
    const snapshot = <Application />;
    expect(snapshot).toMatchSnapshot();
  });
});
// TODO + Cypress stuff
describe('about page rendering tests', () => {});
describe('dashboard page rendering tests', () => {});
describe('login page tests', () => {});
describe('main home page rendering tests', () => {});
describe('questionnaire rendering tests', () => {});
describe('therapist information page rendering tests', () => {});
describe('additional user information page rendering tests', () => {});
