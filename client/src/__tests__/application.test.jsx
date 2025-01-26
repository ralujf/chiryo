import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Application from '../views/application';

describe('Application form tests', () => {
  test('displays the application form for therapists to apply', () => {
    const testMessage = 'Not in document';
    render(<Application />);
    expect(screen.queryByText(testMessage)).toBeNull();
  });
  // Complete this testcase
  test('renders application', () => {
    expect().toMatchSnapshot();
  });
});
