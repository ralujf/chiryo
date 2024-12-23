import PropTypes from 'prop-types';
const DashboardSidebar = (props) => {
  const { username, information } = props;
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
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
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
          <div>{information}</div>
        </div>
      </div>
    </>
  );
};

DashboardSidebar.propTypes = {
  username: PropTypes.string.isRequired,
  information: PropTypes.string.isRequired,
};

export default DashboardSidebar;
