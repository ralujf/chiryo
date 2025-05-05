import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';

import { Tooltip } from 'react-tooltip';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useIdentityStore } from '../state/state';
import { useTokenValidation } from '../hooks/useTokenValidation';
import { usePageInfo } from '../hooks/usePageInfo';

import {
  loadTableData,
  removeRowFromTable,
  clearTable,
  matchUserWithTherapists,
  updateRowFromTable,
  setFirstLogin,
} from '../api/crud';

import Pagination from '../components/pagination';
import Intro from '../components/intro';
import DashboardSidebar from '../components/dashboardSidebar';
import { copyToClipBoard, notifyError } from '../components/notifications';
import { NotificationContainer } from '../components/notificationContainer';
import { responseHandler } from '../components/notifications';

const Dashboard = () => {
  usePageInfo({
    title: 'Dashboard | Chiryō',
    metaDescription:
      'See therapists that you have been matched and schedule different dates',
  });
  const { userId, role, firstLogin } = useIdentityStore((state) => state);
  const validated = useTokenValidation({ userId });

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (validated && firstLogin) {
      setFirstLogin({
        data: { userId: userId, firstLogin: firstLogin, role: role },
      });
    }
  }, [firstLogin, userId, role, validated]);

  useEffect(() => {
    let offset = String(currentPage);

    const updateData = async () => {
      if (validated) {
        const initResponse = await loadTableData(
          { data: { userId: userId, role: role } },
          offset,
        );

        const response = responseHandler({ res: initResponse, silence: true });

        console.log('Dashboard Data:', response);

        setTableData(response.data);
        setTotalPages(response.total);
      }
    };

    updateData();
  }, [currentPage, userId, role, validated]);

  /**
   *
   * @param {number} rowIndex
   * @param {Array<Object>} valueArr
   * @param {Array<string>} keyArr - i.e. time, location, locationLink
   * @description - Update the state, then pass the newly updated state to an async function that will update the database
   */
  const handleRowUpdate = async (rowIndex, valueArr, keyArr) => {
    const updatedTableData = [...tableData];

    let offset = String(currentPage);

    keyArr.forEach((key, index) => {
      updatedTableData[rowIndex][key] = valueArr[index];
    });

    const initResponse = await updateRowFromTable({
      data: {
        role: role,
        userId: updatedTableData[rowIndex].user._id,
        therapistId: updatedTableData[rowIndex].therapist._id,
        rowData: { ...updatedTableData[rowIndex] },
      },
      offset,
    });

    const response = responseHandler({ res: initResponse, silence: true });

    setTableData(response.data);
    setTotalPages(response.total);
  };

  const handleRemoveRow = async ({ userId, therapistId }) => {
    let offset = String(currentPage);

    const initResponse = await removeRowFromTable({
      data: {
        role: role,
        userId: userId,
        therapistId: therapistId,
      },
      offset,
    });

    const response = responseHandler({ res: initResponse });

    setTableData(response.data);
    setTotalPages(response.total);
  };

  const handleClearTable = async ({ role, userId }) => {
    let offset = String(currentPage);

    if (tableData.length === 0) {
      notifyError('Nothing to clear here!');
      return null;
    }

    const initResponse = await clearTable({
      data: {
        role: role,
        userId: userId,
      },
      offset,
    });

    responseHandler({ res: initResponse });

    setTableData([]);
    setTotalPages(0);
  };

  return validated ? (
    <div className="container-fluid main-container vw-100 p-5 mt-5">
      {firstLogin && <Intro role={role} />}
      <Tooltip id="status-header" />
      <Tooltip id="time-header" />
      <Tooltip id="meeting-header" />
      <NotificationContainer />
      <motion.h1 {...animationOptions3} className="display-3 fw-bolder mb-5">
        Dashboard | {currentPage + 1}
      </motion.h1>
      {role === 'user' && (
        <motion.button
          {...animationOptions3}
          className="right text-dark chiryo_rounded chiryo_primary_active mb-3"
          onClick={() => matchUserWithTherapists({ data: { userId: userId } })}
        >
          Request New Therapists
        </motion.button>
      )}
      <motion.div
        {...animationOptions3}
        className="chiryo_shadow w-100 overflow-hidden"
        style={{
          borderRadius: '2em',
          border: '1rem solid rgb(135, 206, 235)',
        }}
      >
        <table className="table w-100">
          <thead className="chiryo_primary">
            <tr>
              <th className="chiryo_primary align-middle">
                {role === 'user' ? 'Therapist' : 'Client'}
              </th>
              <th
                className="chiryo_primary align-middle"
                data-tooltip-id="time-header"
                data-tooltip-content="Pick the time at which you want to meet"
                data-tooltip-place="top"
              >
                Time
              </th>
              <th
                className="chiryo_primary align-middle"
                data-tooltip-id="meeting-header"
                data-tooltip-content="Pick the style of meeting you want"
                data-tooltip-place="top"
              >
                Meeting Point
              </th>
              <th
                className="chiryo_primary align-middle"
                data-tooltip-id="status-header"
                data-tooltip-content="Indicate how you feel about the sessions"
                data-tooltip-place="top"
              >
                {role == 'therapist' ? 'Success' : 'Status'}
              </th>
              <th className="chiryo_primary">
                <button
                  className="btn chiryo_rounded chiryo_primary_action w-100"
                  onClick={() => handleClearTable({ role, userId })}
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
                      elementId={String(rowIndex)}
                      username={
                        role === 'user'
                          ? row.therapist.username
                          : row.user.username
                      }
                      email={
                        role === 'user' ? row.therapist.email : row.user.email
                      }
                      age={role === 'user' ? row.therapist.age : row.user.age}
                      firstName={role == 'user' && row.therapist.firstName}
                      lastName={role == 'user' && row.therapist.lastName}
                      // Constants
                      expertise={row.therapist.expertise}
                      diagnosis={row.diagnosis}
                      clientName={row.user.username}
                    />
                  </td>
                  <td>
                    <div className="block">
                      <DatePicker
                        selected={new Date(row.time)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="Pp"
                        onChange={(date) => {
                          console.log(date);
                          handleRowUpdate(
                            rowIndex,
                            [date.toISOString()],
                            ['time'],
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
                                e.preventDefault();
                                let sentMail =
                                  role === 'therapist'
                                    ? row.user.email
                                    : row.therapist.email;
                                handleRowUpdate(
                                  rowIndex,
                                  [sentMail, 'Virtual'],
                                  ['locationLink', 'location'],
                                );
                              }}
                            >
                              Virtual
                            </button>
                          </li>
                          <li>
                            <input
                              type="text"
                              className="dropdown-item"
                              placeholder="Phone Num..."
                              onClick={(e) => {
                                handleRowUpdate(
                                  rowIndex,
                                  [e.currentTarget.value, 'Phone'],
                                  ['locationLink', 'location'],
                                );
                              }}
                            ></input>
                          </li>
                          <li className="d-flex align-items-center">
                            <input
                              type="text"
                              className="dropdown-item w-75"
                              placeholder="Location..."
                              onInput={(e) => {
                                handleRowUpdate(
                                  rowIndex,
                                  [e.currentTarget.value, 'In-person'],
                                  ['locationLink', 'location'],
                                );
                              }}
                            ></input>
                            <a
                              href="https://www.google.co.uk/maps/"
                              rel="external"
                              target="_blank"
                              className="ms-2 h-auto w-auto"
                            >
                              <i className="bi bi-geo-alt text-black h-auto w-auto"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <a
                        target="_blank"
                        href={
                          row.locationLink.match(/^https?:\/\//)
                            ? `${row.locationLink}`
                            : undefined
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          copyToClipBoard(row.locationLink, row.location);
                        }}
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
                            [!row.markResolvedTherapist],
                            ['markResolvedTherapist'],
                          );
                        } else if (role === 'user') {
                          handleRowUpdate(
                            rowIndex,
                            [!row.markResolvedUser],
                            ['markResolvedUser'],
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
                      onClick={() =>
                        handleRemoveRow({
                          userId: row.user._id,
                          therapistId: row.therapist._id,
                        })
                      }
                    >
                      <i className="bi bi-trash"></i>
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

export default Dashboard;
