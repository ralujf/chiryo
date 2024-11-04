import { useEffect, useState } from 'react';
import { loadTableData, removeRowFromTable } from '../api/crud';

const pageNo = (eventTarget) => {
  return eventTarget.value;
};
const headerParam = 'therapist';

const Dashboard = () => {
  const [tableData, setTableData] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(null)),
  );
  const [fetchOffset, setFetchOffset] = useState(0);
  const pages = Array(5).fill(1);

  useEffect(() => {
    // TODO: Fetch relevant table data
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
      className="container-fluid main-container d-flex flex-column justify-content-center"
      style={{ width: '100vw', padding: '0vw 5vw' }}
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
              <th className="chiryo_primary">Remove All</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td onKeyDown={removeRowFromTable}>
                  <i className="bi bi-trash"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((_, idx) => {
            <li className="page-item" key={idx} onClick={pageNo}>
              {idx}
            </li>;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
