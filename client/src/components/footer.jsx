import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 container-fluid z-6 vw-100 relative-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Seek Help</h5>
            <ul className="list-unstyled">
              <li className="chiryo_footer_link rounded">
                <Link className="text-white" href="/">
                  Home
                </Link>
              </li>
              <li className="chiryo_footer_link rounded">
                <Link className="text-white" href="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Become a Therapist</h5>
            <ul className="list-unstyled">
              <li className="chiryo_footer_link rounded">
                <Link className="text-white" href="/become-a-therapist">
                  Apply
                </Link>
              </li>
              <li className="chiryo_footer_link rounded">
                <Link className="text-white" href="/become-a-therapist">
                  Requirements
                </Link>
              </li>
              <li className="chiryo_footer_link rounded">
                <Link className="text-white" href="/become-a-therapist/info">
                  Additional Information for Therapists
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-left mx-5 opacity-50" style={{ margin: '0vh 15vw' }}>
        <small>
          Any personal information used is stored in accordance to existing
          standards and will be encrypted end-to-end. This project does not
          utilise any personal information when testing and therefore does not
          require ethics approval.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
