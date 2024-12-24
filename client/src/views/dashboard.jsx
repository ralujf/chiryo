import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Intro from '../components/intro';
import DashboardSidebar from '../components/dashboardSidebar';
import { loadTableData, removeRowFromTable, clearTable } from '../api/crud';
import 'react-datepicker/dist/react-datepicker.css';
// TODO: Get this information from globalState
const headerParam = 'therapist';
const userId = 1;
const firstTime = false;

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [tableData, setTableData] = useState([[], [], [], [], [], []]);
  const pages = Array.from({ length: 5 }, (_, i) => i + 1);

  useEffect(() => {
    let offset = currentPage;
    let newTableData;
    const updateData = () => {
      newTableData = loadTableData(userId, offset);
      console.log(newTableData);
      setTableData(newTableData);
    };
    updateData();
  }, [currentPage]);

  return (
    <div
      className="container-fluid main-container"
      style={{ width: '100vw', minHeight: '80vh', padding: '15vh 5vw' }}
    >
      {firstTime && <Intro />}
      <h1 className="display-3 fw-bolder mb-5" id="dashboard-title">
        Dashboard | {currentPage}
      </h1>
      <button className="right text-dark chiryo_rounded chiryo_primary_active mb-3">
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
        <table className="table table-hover w-100">
          <thead className="chiryo_primary">
            <tr>
              <th className="chiryo_primary align-middle">Name</th>
              <th className="chiryo_primary align-middle">Time</th>
              <th className="chiryo_primary align-middle">Meeting Point</th>
              <th className="chiryo_primary align-middle">
                {headerParam == 'therapist' ? 'Success' : 'Problem'}
              </th>
              <th className="chiryo_primary" onClick={() => clearTable(userId)}>
                <button
                  className="btn chiryo_rounded chiryo_primary_action"
                  style={{ width: '100%' }}
                >
                  {' '}
                  <i className="bi bi-trash"></i> Remove All
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* TODO: Change this to be able to render both the user and therapist forat */}
            {Array.isArray(tableData) &&
              tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-middle">
                  <td key={rowIndex}>
                    <span>
                      <DashboardSidebar username={row.user.username} />
                    </span>
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
                      <input
                        type="time"
                        className="form-control chiryo_secondary rounded mr-3"
                        value={row.time.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      ></input>
                      <DatePicker
                        selected={row.time}
                        onChange={(date) => console.log(date)}
                      />
                    </div>
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
                        href={row}
                        className="chiryo_secondary text-secondary rounded py-1 px-2"
                      >
                        <i className="bi bi-person-video3"></i>
                      </a>
                    </div>

                    <button
                      className="chiryo_secondary text-secondary"
                      style={{ height: 'fit-content' }}
                    >
                      <div
                        className="d-flex flex-row justify-content-evenly"
                        style={{ gap: '10px' }}
                      >
                        <p className="mb-0">{row.markResolvedUser}</p>
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
            {pages.map((_, idx) => {
              return (
                <li className="page-item" key={idx}>
                  <button
                    className="page-link"
                    onClick={() => {
                      setCurrentPage(idx);
                    }}
                  >
                    {idx}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
