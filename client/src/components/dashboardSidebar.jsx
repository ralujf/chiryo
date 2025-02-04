import PropTypes from 'prop-types';
const DashboardSidebar = (props) => {
  const { username, email, age, diagnosis } = props;
  return (
    <>
      <button
        className="btn chiryo_primary_active d-flex align-items-center"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSidebar"
        aria-controls="offcanvasSidebar"
      >
        <p className="mb-0 me-2">{username}</p>
        <i className="bi bi-person-lines-fill"></i>
      </button>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasUserLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasUserLabel">
            {username}&apos;s Profile
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>{age}</p>
          <hr></hr>
          <p>{diagnosis}</p>
          <p>
            This is placeholder text to see if the text will wrap when the text
            is longer
          </p>
          <button
            className="text-dark chiryo_rounded chiryo_primary_active mb-3"
            onClick={() => (window.location.href = `mailto:${email}`)}
          >
            Send Email
          </button>
        </div>
      </div>
    </>
  );
};

DashboardSidebar.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // TODO: Alter implementation and change the rest once everything is done
  age: PropTypes.string,
  diagnosis: PropTypes.string,
};

export default DashboardSidebar;
