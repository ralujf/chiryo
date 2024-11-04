import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Seek Help</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-muted" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-muted" href="">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Become a Therapist</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-muted" href="/become-a-therapist">
                  Apply
                </Link>
              </li>
              <li>
                <Link className="text-muted" href="/become-a-therapist">
                  Requirements
                </Link>
              </li>
              <li>
                <Link className="text-muted" href="">
                  Additional Information for Therapists
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
