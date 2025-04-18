import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';
import DatePicker from 'react-datepicker';
import Intro from '../components/intro';
import DashboardSidebar from '../components/dashboardSidebar';
import { copyToClipBoard } from '../components/notifications';
import {
  loadTableData,
  removeRowFromTable,
  clearTable,
  getTherapists,
  updateRowFromTable,
  setFirstLogin,
} from '../api/crud';
import 'react-datepicker/dist/react-datepicker.css';
import { useCredentialStore } from '../state/state';
import Pagination from '../components/pagination';
import { NotificationContainer } from '../components/notificationContainer';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [tableData, setTableData] = useState();
  const { userId, role, firstLogin } = useCredentialStore((state) => state);

  useEffect(() => {
    setFirstLogin({
      data: { userId: userId, firstLogin: firstLogin, role: role },
    });
  }, [firstLogin, userId, role]);

  useEffect(() => {
    let offset = currentPage;
    const updateData = () => {
      const newTableData = loadTableData(
        { data: { userId: userId, role: role } },
        offset,
      );
      console.log('Dashboard Data:', newTableData);
      setTableData(newTableData.tableData);
      setTotalPages(newTableData.total);
    };
    updateData();
  }, [currentPage, userId, role]);

  /**
   *
   * @param {number} rowIndex
   * @param {Array<Object>} valueArr
   * @param {Array<string>} keyArr - i.e. time, location, locationLink
   * @description - Update the state, then pass the newly updated state to an async function that will update the database
   */
  const handleRowUpdate = (rowIndex, valueArr, keyArr) => {
    const updatedTableData = [...tableData];
    keyArr.forEach((key, index) => {
      updatedTableData[rowIndex][key] = valueArr[index];
    });
    setTableData(updatedTableData);
    updateRowFromTable({
      data: {
        userId: updatedTableData[rowIndex].userId,
        therapistId: updatedTableData[rowIndex].therapistId,
        ...updatedTableData[rowIndex],
      },
    });
  };

  return (
    <div className="container-fluid main-container vw-100 p-5 mt-5">
      {firstLogin && <Intro />}
      <NotificationContainer />
      <motion.h1 {...animationOptions3} className="display-3 fw-bolder mb-5">
        Dashboard | {currentPage + 1}
      </motion.h1>
      {role === 'user' && (
        <motion.button
          {...animationOptions3}
          className="right text-dark chiryo_rounded chiryo_primary_active mb-3"
          onClick={() => getTherapists({ data: { userId: userId } })}
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
              <th className="chiryo_primary align-middle">Time</th>
              <th className="chiryo_primary align-middle">Meeting Point</th>
              <th className="chiryo_primary align-middle">
                {role == 'therapist' ? 'Success' : 'Status'}
              </th>
              <th className="chiryo_primary">
                <button
                  className="btn chiryo_rounded chiryo_primary_action w-100"
                  onClick={() =>
                    clearTable({
                      data: {
                        role: role,
                        userId: userId,
                      },
                    })
                  }
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
                      id={rowIndex}
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
                        selected={row.time}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="Pp"
                        onChange={(e) => {
                          handleRowUpdate(
                            rowIndex,
                            [e.currentTarget.value],
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
                              onClick={() => {
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
                        removeRowFromTable({
                          data: {
                            userId: row.userId,
                            therapistId: row.therapistId,
                          },
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
  );
};

export default Dashboard;
