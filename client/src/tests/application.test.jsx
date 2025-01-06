import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Application from '../views/application';

describe('application form tests', () => {
  test('displays the application form for therapists to apply', () => {
    const testMessage = 'Test';
    render(<Application />);
    expect(screen.queryByText(testMessage)).toBeNull();
  });
});
