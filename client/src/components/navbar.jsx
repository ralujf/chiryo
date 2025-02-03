import { Link } from 'wouter';
// TODO: bootstrap messing up fix this at some  point
const Navbar = () => {
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
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
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

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard"
                style={{ color: 'darkgrey' }}
              >
                Dashboard
              </Link>
            </li>
          </ul>

          <Link
            className="nav-link text-dark chiryo_rounded chiryo_primary_active"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
