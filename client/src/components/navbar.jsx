import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useCredentialStore } from '../state/state';
import { fetchJWT } from '../api/auth';
import { logoutUserRedirect } from '../api/crud';

const Navbar = () => {
  const [validated, setIsValidated] = useState('');
  const { userId, adminId, setUser } = useCredentialStore((state) => state);

  useEffect(() => {
    const fetchToken = () => {
      const token = fetchJWT();
      if (token) {
        setIsValidated(true);
      } else {
        setIsValidated(false);
      }
    };
    fetchToken();
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      style={{ boxShadow: '0 2px 40px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ color: 'darkgrey' }}>
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
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/questionnaire"
                style={{ color: 'darkgrey' }}
              >
                Seek Help
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/become-a-therapist"
                style={{ color: 'darkgrey' }}
              >
                Apply to be a Therapist
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
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

            {userId && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/dashboard"
                    style={{ color: 'darkgrey' }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/profile"
                    style={{ color: 'darkgrey' }}
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}

            {adminId && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/applicants"
                    style={{ color: 'darkgrey' }}
                  >
                    Applicants
                  </Link>
                </li>
              </>
            )}
          </ul>
          {validated ? (
            <button
              className="nav-link text-dark chiryo_rounded chiryo_primary_active fw-bold"
              onClick={() => {
                setUser({
                  adminId: null,
                  userId: null,
                  role: null,
                  firstLogin: null,
                });
                logoutUserRedirect();
              }}
            >
              Log out
            </button>
          ) : (
            <Link
              className="nav-link text-dark chiryo_rounded chiryo_primary_active fw-bold"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
