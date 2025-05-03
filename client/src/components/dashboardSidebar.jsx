import PropTypes from 'prop-types';
import profileImage from '../assets/profile.jpg';

const DashboardSidebar = (props) => {
  const {
    elementId,
    username,
    clientName,
    email,
    age,
    diagnosis,
    expertise,
    firstName,
    lastName,
  } = props;

  return (
    <>
      <button
        className="btn chiryo_primary_active d-flex align-items-center justify-content-between w-75"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvasSidebar-${elementId}`}
        aria-controls={`offcanvasSidebar-${elementId}`}
      >
        <p className="mb-0 me-2 mr-full">
          {username ? username : firstName + lastName}
        </p>
        <i className="bi bi-person-lines-fill"></i>
      </button>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id={`offcanvasSidebar-${elementId}`}
        aria-labelledby={`offcanvasUserLabel-${elementId}`}
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title"
            id={`offcanvasUserLabel-${elementId}`}
          >
            {username ? username : firstName}&apos;s Profile
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="d-flex align-items-center">
          <img src={profileImage} className="w-25"></img>
        </div>

        <div className="offcanvas-body">
          {firstName && lastName && (
            <h4>
              {firstName} {lastName}
            </h4>
          )}
          {age && <p>{parseInt(age)} years old</p>}

          {expertise && (
            <>
              <hr></hr>
              <h5>Expertise</h5>
              <p>{expertise}</p>
            </>
          )}

          <hr></hr>
          {diagnosis && clientName && (
            <>
              <h5>{clientName}&apos;s Diagnosis</h5>
              <p>{diagnosis}</p>
            </>
          )}

          {email && (
            <button
              className="text-dark chiryo_rounded chiryo_primary_active mb-3"
              onClick={() => (window.location.href = `mailto:${email}`)}
            >
              Send Email
            </button>
          )}
        </div>
      </div>
    </>
  );
};

DashboardSidebar.propTypes = {
  elementId: PropTypes.string.isRequired,
  clientName: PropTypes.string,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  diagnosis: PropTypes.string,
  expertise: PropTypes.string.isRequired,
};

export default DashboardSidebar;
