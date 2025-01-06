import { useEffect, useState } from 'react';
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
// TODO: Get this information from globalState
const role = 'therapist';
const userId = 1;
const firstTime = false;

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [tableData, setTableData] = useState();
  const pages = Array.from({ length: 5 }, (_, i) => i + 1);

  useEffect(() => {
    let offset = currentPage;
    let newTableData;
    const updateData = () => {
      newTableData = loadTableData(userId, offset);
      console.log('Dashboard Data', newTableData);
      setTableData(newTableData);
    };
    updateData();
  }, [currentPage]);

  const handleRowUpdate = (rowItem) => {
    // listen for the user updating any fields
    // Take in the row of data has had the value change
    // pass the row that received changes, with the new data to console.log
    console.log(rowItem);
    // updateRowFromTable()
  };

  return (
    <div
      className="container-fluid main-container"
      style={{ width: '100vw', minHeight: '80vh', padding: '15vh 5vw' }}
    >
      {firstTime && <Intro />}
      <h1 className="display-3 fw-bolder mb-5" id="dashboard-title">
        Dashboard | {currentPage + 1}
      </h1>
      <button
        className="right text-dark chiryo_rounded chiryo_primary_active mb-3"
        onClick={() => getTherapists(userId)}
      >
        Request New Therapists
      </button>
      <div
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
                {role == 'therapist' ? 'Success' : 'Problem'}
              </th>
              <th className="chiryo_primary">
                <button
                  className="btn chiryo_rounded chiryo_primary_action"
                  style={{ width: '100%' }}
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
                    <div
                      className="chiryo_secondary rounded"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                        alignContent: 'center',
                        gap: '5px',
                      }}
                    >
                      <div style={{ display: 'block' }}>
                        <DatePicker
                          selected={row.time}
                          onChange={(date) => handleRowUpdate(date)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          timeCaption="time"
                          dateFormat="Pp"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-row">
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
                            <button className="dropdown-item">Virtual</button>
                          </li>
                          <li>
                            <button className="dropdown-item">Phone</button>
                          </li>
                          <li>
                            <button className="dropdown-item">In-Person</button>
                          </li>
                        </ul>
                      </div>
                      <a
                        href={row.locationLink}
                        className="chiryo_secondary text-secondary rounded py-1 px-2"
                      >
                        <i className="bi bi-person-video3"></i>
                      </a>
                    </div>
                  </td>
                  <td>
                    <button
                      className="chiryo_secondary text-secondary"
                      style={{ height: 'fit-content' }}
                    >
                      <div
                        className="d-flex flex-row justify-content-evenly"
                        style={{ gap: '10px' }}
                      >
                        <p className="mb-0">
                          {role === 'therapist' && (
                            <div>
                              {row.markResolvedTherapist ? 'Yes' : 'No'}
                            </div>
                          )}
                          {role === 'user' && (
                            <div> {row.markResolvedUser ? 'Yes' : 'No'}</div>
                          )}
                        </p>
                        <i className="bi bi-arrow-repeat"></i>
                      </div>
                    </button>
                  </td>
                  <td onKeyDown={() => removeRowFromTable(userId, rowIndex)}>
                    <button
                      className="btn btn-outline-secondary"
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      onClick={() => removeRowFromTable(userId, row)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="container-fluid mt-5">
        <nav
          aria-label="Page navigation"
          className="d-flex justify-content-center"
        >
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link">
                Previous
              </a>
            </li>
            {pages.map((_, idx) => {
              return (
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
              );
            })}
            <li className="page-item">
              <a href="#" className="page-link" onClick={console.log('yessir')}>
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
