import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';
import { ToastContainer, toast } from 'react-toastify';
import DashboardSidebar from '../components/dashboardSidebar';
import { useCredentialStore } from '../state/state';
import {
  fetchApplicants,
  acceptApplicant,
  rejectApplicant,
  searchForTherapists,
} from '../api/crud';

const Admin = () => {
  const { adminId } = useCredentialStore((state) => state.adminId);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [tableData, setTableData] = useState();

  useEffect(() => {
    let offset = currentPage;
    const updateData = () => {
      const newTableData = fetchApplicants(
        { data: { adminId: adminId } },
        offset,
      );
      console.log('Admin Data:', newTableData);
      setTableData(newTableData.tableData);
      setTotalPages(newTableData.total);
    };

    updateData();
  }, [currentPage, adminId]);

  const handleRejectApplicant = (email) => {
    const result = rejectApplicant({
      data: {
        email: email,
        adminId: adminId,
      },
    });

    if (result) {
      notify();
    } else {
      notifyError();
    }
  };

  const handleAcceptApplicant = (data) => {
    const result = acceptApplicant({
      data: { applicationInformation: data, adminId: adminId },
    });

    if (result) {
      notify();
    } else {
      notifyError();
    }
  };

  const notify = () =>
    toast.success('Success!', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'light',
    });

  const notifyError = () =>
    toast.error('Error', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light',
      type: 'error',
    });

  return (
    <div
      className="container-fluid main-container"
      style={{ width: '100vw', minHeight: '80vh', padding: '15vh 5vw' }}
    >
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <motion.h1
        {...animationOptions3}
        className="display-3 fw-bolder mb-5"
        id="dashboard-title"
      >
        Applicants | {currentPage + 1}
      </motion.h1>

      <motion.div
        {...animationOptions3}
        className="chiryo_shadow"
        style={{
          overflow: 'hidden',
          borderRadius: '2em',
          width: '100%',
          border: '1rem solid rgb(135, 206, 235)',
        }}
      >
        <table className="table w-100">
          <thead className="chiryo_primary">
            <tr>
              <th className="chiryo_primary align-middle">Name</th>
              <th className="chiryo_primary align-middle">Qualifications</th>
              <th className="chiryo_primary">
                <button
                  onClick={() =>
                    searchForTherapists({ data: { adminId: adminId } })
                  }
                  className="btn chiryo_rounded chiryo_primary_action w-100"
                >
                  {' '}
                  Enrol Applicants
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tableData) &&
              tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-middle">
                  <td>
                    <DashboardSidebar {...row.data} />
                  </td>

                  <td>Qualification here</td>

                  <td>
                    <button
                      className="chiryo_secondary text-secondary w-100 h-100"
                      onClick={() => handleRejectApplicant()}
                    >
                      <i className="bi bi-x"></i>
                    </button>

                    <button
                      className="btn btn-outline-secondary w-100 h-100"
                      onClick={() => handleAcceptApplicant()}
                    >
                      <i className="bi bi-check2-circle"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </motion.div>

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
                  if (currentPage > 0) setCurrentPage(currentPage - 1);
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
                  if (currentPage < totalPages - 1)
                    setCurrentPage(currentPage + 1);
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Admin;
