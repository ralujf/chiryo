import { useEffect, useState } from 'react';
import { loadTableData, removeRowFromTable, clearTable } from '../api/crud';

const pageNo = (eventTarget) => {
  return eventTarget.currenTarget.value;
};

const headerParam = 'therapist';

const Dashboard = () => {
  const [tableData, setTableData] = useState([[], [], [], [], []]);
  const [fetchOffset, setFetchOffset] = useState(0);
  const pages = Array(5).fill(1);

  useEffect(() => {
    const userId = 1;
    let offset = 0;

    offset = pageNo() * 10;
    console.log(offset);
    const newTableData = loadTableData(userId, offset);

    setFetchOffset(offset / 10);
    setTableData(newTableData);
  }, []);

  return (
    <div
      className="container-fluid main-container"
      style={{ width: '100vw', minHeight: '80vh', padding: '15vh 5vw' }}
    >
      <h1 className="display-3 fw-bolder mb-5">Dashboard | {fetchOffset}</h1>
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
              <th className="chiryo_primary">Name</th>
              <th className="chiryo_primary">Time</th>
              <th className="chiryo_primary">Meeting Point</th>
              <th className="chiryo_primary">
                {headerParam == 'therapist' ? 'Success' : 'Problem'}
              </th>
              <th className="chiryo_primary" onClick={clearTable()}>
                Remove All
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tableData) &
              tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                  <td onKeyDown={removeRowFromTable()}>
                    <i className="bi bi-trash"></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination">
          {pages.map((_, idx) => {
            <li className="page-item" key={idx} onClick={pageNo()}>
              {idx}
            </li>;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
