import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useIdentityStore } from '../state/state';

import { logoutUserRedirect } from '../api/crud';

import { useTokenValidation } from '../hooks/useTokenValidation';

const Navbar = () => {
  const { userId, adminId, role, resetUser, setCurrentQuestionIndex } =
    useIdentityStore((state) => state);

  const validated = useTokenValidation({ userId, adminId, redirect: false });
  const [signIn, setSignIn] = useState(false);

  useEffect(() => {
    setSignIn(localStorage.getItem('signinToken') ? true : false);
  }, [userId]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      style={{ boxShadow: '0 2px 40px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="container-fluid px-5">
        <Link className="navbar-brand chiryo_nav_secondary_link" to="/">
          Chiryō
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNavDropdown"
          aria-labelledby="navbarNavDropdown"
        >
          <ul className="navbar-nav w-full" style={{ marginRight: 'auto' }}>
            <li className="nav-item d-flex justify-content-center align-items-center">
              <Link
                className="chiryo_nav_link chiryo_rounded"
                to="/questionnaire"
              >
                Seek Help
              </Link>
            </li>

            {role != 'therapist' && (
              <li className="nav-item">
                <Link
                  className="nav-link chiryo_nav_secondary_link"
                  to="/become-a-therapist"
                >
                  Apply to be a Therapist
                </Link>
              </li>
            )}

            <li className="nav-item dropdown">
              <Link
                className="nav-link chiryo_nav_secondary_link dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ color: 'darkgrey' }}
              >
                Resources
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="/info/">
                  Why is mental health important?
                </Link>
                <Link className="dropdown-item" to="/info/">
                  Ways to improve mental health
                </Link>
                <Link className="dropdown-item" to="/info/">
                  Recommended Services
                </Link>
              </div>
            </li>

            {validated && signIn === false && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link chiryo_nav_secondary_link"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link chiryo_nav_secondary_link"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}

            {adminId && signIn === false && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link chiryo_nav_secondary_link"
                    to="/applicants"
                  >
                    Applicants
                  </Link>
                </li>
              </>
            )}
          </ul>

          {validated && signIn === false ? (
            <button
              className="nav-link text-dark chiryo_rounded chiryo_primary_active fw-bold"
              onClick={() => {
                resetUser();
                setCurrentQuestionIndex(0);
                logoutUserRedirect();
              }}
            >
              Log out
            </button>
          ) : (
            <Link
              className="nav-link text-dark chiryo_rounded chiryo_primary_active fw-bold"
              to="/login"
              onClick={() => resetUser()}
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
