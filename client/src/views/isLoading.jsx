import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTherapists } from '../api/crud';

const IsLoading = ({ introStateOptions, introStateSetter, userId }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  getTherapists(userId);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          // TODO: Wrong way of doing this, refactor at some point to use global state instead of external mutation
          introStateSetter(introStateOptions.GENCRED);
          return 100;
        }
        return prevProgress + 3.33;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <p className="display-4">Generating your match...</p>
      <div className="progress" style={{ width: '80%' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${loadingProgress}%` }}
          aria-valuenow={loadingProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <p className="display-5">{loadingProgress}%</p>
    </div>
  );
};

IsLoading.propTypes = {
  introStateOptions: PropTypes.string.isRequired,
  introStateSetter: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default IsLoading;
