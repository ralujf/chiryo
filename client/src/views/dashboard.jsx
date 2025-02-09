import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import Intro from '../components/intro';
import DashboardSidebar from '../components/dashboardSidebar';
import {
  loadTableData,
  removeRowFromTable,
  clearTable,
  getTherapists,
  updateRowFromTable,
} from '../api/crud';
import 'react-datepicker/dist/react-datepicker.css';
import { useCredentialStore } from '../state/state';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [tableData, setTableData] = useState();

  const { userId, role, email, phoneNumber, firstLogin } = useCredentialStore(
    (state) => state,
  );
  useEffect(() => {
    let offset = currentPage;
    let newTableData;
    const updateData = () => {
      newTableData = loadTableData(userId, offset);
      console.log('Dashboard Data', newTableData);
      setTableData(newTableData.tableData);
      setTotalPages(newTableData.total);
    };
    updateData();
  }, [currentPage, userId]);

  /**
   *
   * @param {number} rowIndex
   * @param {Object} data
   * @param {string} type - i.e. time, location, locationLink
   * @description - Update the state, then pass the newly updated state to an async function that will update the database
   */
  const handleRowUpdate = (rowIndex, data, type) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex] = {
      ...updatedTableData[rowIndex],
      [type]: data,
    };
    setTableData(updatedTableData);
    updateRowFromTable(tableData[rowIndex]);
  };

  const createMessage = (type) => {
    switch (type) {
      case 'Phone':
        return 'Phone number was copied!';
      case 'In-person':
        return 'Location was copied';
      case 'Virtual':
        return 'Meeting link was copied!';
      default:
        return 'Unknown type';
    }
  };

  const copyToClipBoard = async (value, type) => {
    let message = createMessage(type);
    console.log(type);
    try {
      await navigator.clipboard.writeText(value);
      notify(message);
    } catch (err) {
      notifyError();
      console.error('Could not copy text: ', err);
    }
  };

  const notify = (msg) =>
    toast.success(msg, {
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
    toast.error(
      'Oops - looks like something went wrong! Refresh and try again',
      {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
        type: 'error',
      },
    );

  return (
    <div
      className="container-fluid main-container"
      style={{ width: '100vw', minHeight: '80vh', padding: '15vh 5vw' }}
    >
      {firstLogin && <Intro />}
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
        Dashboard | {currentPage + 1}
      </motion.h1>
      <motion.button
        {...animationOptions3}
        className="right text-dark chiryo_rounded chiryo_primary_active mb-3"
        onClick={() => getTherapists(userId)}
      >
        Request New Therapists
      </motion.button>
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
              <th className="chiryo_primary align-middle">Time</th>
              <th className="chiryo_primary align-middle">Meeting Point</th>
              <th className="chiryo_primary align-middle">
                {role == 'therapist' ? 'Success' : 'Status'}
              </th>
              <th className="chiryo_primary">
                <button
                  className="btn chiryo_rounded chiryo_primary_action w-100"
                  onClick={() => clearTable(userId)}
                >
                  {' '}
                  <i className="bi bi-trash"></i> Remove All
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tableData) &&
              tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-middle">
                  <td>
                    <DashboardSidebar
                      {...(row.user ? row.user : row.therapist)}
                    />
                  </td>
                  <td>
                    <div style={{ display: 'block' }}>
                      <DatePicker
                        selected={row.time}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="Pp"
                        onChange={(e) => {
                          handleRowUpdate(
                            rowIndex,
                            e.currentTarget.value,
                            'time',
                          );
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-row w-100">
                      <div className="dropdown">
                        <button
                          className="btn chiryo_secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {row.location}
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={(e) => {
                                row.location = 'Virtual';
                                row.locationLink = email;
                                handleRowUpdate(
                                  rowIndex,
                                  e.currentTarget.value,
                                  'location',
                                );
                              }}
                            >
                              Virtual
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={(e) => {
                                row.location = 'Phone';
                                row.locationLink = phoneNumber;
                                handleRowUpdate(
                                  rowIndex,
                                  e.currentTarget.value,
                                  'location',
                                );
                              }}
                            >
                              Phone
                            </button>
                          </li>
                          <li>
                            <input
                              type="text"
                              className="dropdown-item"
                              placeholder="Location..."
                              onInput={(e) => {
                                row.location = 'In-person';
                                row.locationLink = e.currentTarget.value;
                                handleRowUpdate(
                                  rowIndex,
                                  e.currentTarget.value,
                                  'location',
                                );
                              }}
                            ></input>
                          </li>
                        </ul>
                      </div>
                      <a
                        href={
                          row.locationLink.match(/^https?:\/\//)
                            ? `${row.locationLink}`
                            : undefined
                        }
                        onClick={() =>
                          copyToClipBoard(row.locationLink, row.location)
                        }
                        className="chiryo_secondary text-secondary rounded py-1 px-2"
                      >
                        {row.locationLink.match(/^\d+$/) && (
                          <i className="bi bi-telephone"></i>
                        )}
                        {row.locationLink.match(/^https?:\/\//) && (
                          <i className="bi bi-link-45deg"></i>
                        )}
                        {row.locationLink.match(/google\.com\/maps/) && (
                          <i className="bi bi-geo-alt"></i>
                        )}
                      </a>
                    </div>
                  </td>
                  <td>
                    <button
                      className="chiryo_secondary text-secondary w-100 h-100"
                      onClick={() => {
                        if (role === 'therapist') {
                          handleRowUpdate(
                            rowIndex,
                            !row.markResolvedTherapist,
                            'markResolvedTherapist',
                          );
                        } else if (role === 'user') {
                          handleRowUpdate(
                            rowIndex,
                            !row.markResolvedUser,
                            'markResolvedUser',
                          );
                        }
                      }}
                    >
                      <p className="mb-0">
                        {role === 'therapist' && (
                          <>
                            {row.markResolvedTherapist ? (
                              <i className="bi bi-check-lg"></i>
                            ) : (
                              <i className="bi bi-x"></i>
                            )}
                          </>
                        )}
                        {role === 'user' && (
                          <>
                            {' '}
                            {row.markResolvedUser ? (
                              <i className="bi bi-check-lg"></i>
                            ) : (
                              <i className="bi bi-x"></i>
                            )}
                          </>
                        )}
                      </p>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-secondary w-100 h-100"
                      onClick={() => removeRowFromTable(userId, rowIndex)}
                    >
                      <i className="bi bi-trash"></i>
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

export default Dashboard;
