import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';

import DashboardSidebar from '../components/dashboardSidebar';
import { NotificationContainer } from '../components/notificationContainer';
import { notifyError, notifySuccess } from '../components/notifications';

import { useCredentialStore } from '../state/state';
import {
  fetchApplicants,
  acceptApplicant,
  rejectApplicant,
  searchForTherapists,
} from '../api/crud';
import Pagination from '../components/pagination';

const Admin = () => {
  const { adminId, username } = useCredentialStore((state) => state);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    let offset = currentPage;
    const updateData = () => {
      const newTableData = fetchApplicants(
        { data: { adminId, username } },
        offset,
      );
      console.log('Admin Data:', newTableData.tableData);
      setTableData(newTableData.tableData);
      setTotalPages(newTableData.total);
    };

    updateData();
  }, [currentPage, adminId, username]);

  const handleRejectApplicant = (email) => {
    const result = rejectApplicant({
      data: {
        email: email,
        adminId,
        username,
      },
    });

    if (result) {
      notifySuccess();
    } else {
      notifyError();
    }
  };

  const handleAcceptApplicant = (data) => {
    const result = acceptApplicant({
      data: { applicationInformation: data, adminId, username },
    });

    if (result) {
      notifySuccess();
    } else {
      notifyError();
    }
  };

  return (
    <div className="container-fluid main-container vw-100 p-5 mt-5">
      <NotificationContainer />
      <motion.h1 {...animationOptions3} className="display-3 fw-bolder mb-5">
        Applicants | {currentPage + 1}
      </motion.h1>

      <motion.div
        {...animationOptions3}
        className="chiryo_shadow chiryo_table w-100 overflow-hidden"
        style={{
          borderRadius: '2em',
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
                    <DashboardSidebar {...row} id={rowIndex} />
                  </td>

                  <td>
                    <p>
                      {row.expertise}
                      <br></br>
                      {row.credentials}
                    </p>
                  </td>

                  <td className="d-flex flex-row gap-1 h-100">
                    <button
                      className="chiryo_secondary text-secondary w-100 p-2"
                      onClick={() => handleRejectApplicant()}
                    >
                      <i className="bi bi-x"></i>
                    </button>

                    <button
                      className="btn btn-outline-secondary w-100 p-2"
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
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Admin;
