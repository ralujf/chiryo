import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Application from '../views/application';
import About from '../views/about';
import Dashboard from '../views/dashboard';
import Login from '../views/login';
import Main from '../views/main';
import TherapistInfo from '../views/therapistInfo';
import UserInfo from '../views/userInfo';
import Questionnaire from '../views/questionnaire';

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

describe('about page rendering tests', () => {
  test('if it displays the about page content', () => {
    render(<About />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });
  test('that the about page renders correctly', () => {
    const snapshot = <About />;
    expect(snapshot).toMatchSnapshot();
  });
});

describe('dashboard page rendering tests', () => {
  test('if it displays the dashboard content', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
  test('that the dashboard page renders correctly', () => {
    const snapshot = <Dashboard />;
    expect(snapshot).toMatchSnapshot();
  });
});

describe('login page tests', () => {
  test('if it displays the login form', () => {
    render(<Login />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
  test('that the login page renders correctly', () => {
    const snapshot = <Login />;
    expect(snapshot).toMatchSnapshot();
  });
});

describe('main home page rendering tests', () => {
  test('if it displays the main home page content', () => {
    render(<Main />);
    expect(screen.getByText('Welcome to the Home Page')).toBeInTheDocument();
  });
  test('that the main home page renders correctly', () => {
    const snapshot = <Main />;
    expect(snapshot).toMatchSnapshot();
  });
});

describe('questionnaire rendering tests', () => {
  test('if it displays the questionnaire form', () => {
    render(<Questionnaire />);
    expect(screen.getByText('Questionnaire')).toBeInTheDocument();
  });
  test('that the questionnaire renders correctly', () => {
    const snapshot = <Questionnaire />;
    expect(snapshot).toMatchSnapshot();
  });
});

describe('therapist information page rendering tests', () => {
  test('if it displays the therapist information', () => {
    render(<TherapistInfo />);
    expect(screen.getByText('Therapist Information')).toBeInTheDocument();
  });
  test('that the therapist information page renders correctly', () => {
    const snapshot = <TherapistInfo />;
    expect(snapshot).toMatchSnapshot();
  });
});

describe('additional user information page rendering tests', () => {
  test('if it displays the user information', () => {
    render(<UserInfo />);
    expect(screen.getByText('User Information')).toBeInTheDocument();
  });
  test('that the user information page renders correctly', () => {
    const snapshot = <UserInfo />;
    expect(snapshot).toMatchSnapshot();
  });
});
