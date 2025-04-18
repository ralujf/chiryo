import PropTypes from 'prop-types';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="container-fluid mt-5">
      <nav
        aria-label="Page navigation"
        className="d-flex justify-content-center"
      >
        <ul className="pagination">
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              disabled={currentPage === 0}
              onClick={() => {
                if (currentPage > 0) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              Previous
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, idx) => (
            <li className="page-item" key={idx}>
              <a
                className="page-link"
                onClick={() => {
                  setCurrentPage(idx);
                }}
                href="#"
              >
                {idx + 1}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              href="#"
              className={
                currentPage === totalPages - 1
                  ? 'page-link disabled'
                  : 'page-link'
              }
              disabled={currentPage === totalPages - 1}
              onClick={() => {
                if (currentPage < totalPages - 1) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
