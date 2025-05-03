import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';
import { useIdentityStore } from '../state/state';
import { useTokenValidation } from '../hooks/useTokenValidation';

import {
  loadApplicants,
  acceptApplicant,
  rejectApplicant,
  searchForTherapists,
} from '../api/crud';

import Pagination from '../components/pagination';
import DashboardSidebar from '../components/dashboardSidebar';
import { NotificationContainer } from '../components/notificationContainer';
import { responseHandler } from '../components/notifications';

const Admin = () => {
  const { adminId } = useIdentityStore((state) => state);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);

  const validated = useTokenValidation({ adminId });

  useEffect(() => {
    let offset = String(currentPage);

    const updateData = async () => {
      if (validated) {
        const initResponse = await loadApplicants(
          { data: { adminId } },
          offset,
        );
        const response = responseHandler({ res: initResponse, silence: true });

        console.log('Admin Data:', response);

        setTableData(response.data);
        setTotalPages(response.total);
      }
    };

    updateData();
  }, [currentPage, adminId, validated]);

  const handleRejectApplicant = async (email) => {
    const initResponse = await rejectApplicant({
      data: {
        email: email,
        adminId,
      },
    });
    responseHandler({ res: initResponse });
  };

  const handleAcceptApplicant = async (data) => {
    const initResponse = await acceptApplicant({
      data: { applicationInformation: data, adminId },
    });
    responseHandler({ res: initResponse });
  };

  return validated ? (
    <div className="container-fluid main-container vw-100 p-5 mt-5">
      <NotificationContainer />
      <motion.h1 {...animationOptions3} className="display-3 fw-bolder mb-5">
        Applicants | {currentPage + 1}
      </motion.h1>

      <motion.button
        onClick={() => searchForTherapists({ data: { adminId: adminId } })}
        className="right text-dark chiryo_rounded chiryo_primary_active mb-3"
      >
        {' '}
        Find Applicants
      </motion.button>

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
              <th className="chiryo_primary align-middle">Accept?</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tableData) &&
              tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-middle">
                  <td>
                    <DashboardSidebar {...row} elementId={String(rowIndex)} />
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
                      onClick={() => handleRejectApplicant(row.email)}
                    >
                      <i className="bi bi-x"></i>
                    </button>

                    <button
                      className="btn btn-outline-secondary w-100 p-2"
                      onClick={() => handleAcceptApplicant(...row)}
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
  ) : (
    <div className="vh-100 vw-100"></div>
  );
};

export default Admin;
