import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const IsLoading = ({ introStateOptions, introStateSetter }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          introStateSetter(introStateOptions.GENCRED);
          return 100;
        }
        return prevProgress + 3.33; //Fake default timer
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <p>Generating your match...</p>
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
      <p>{loadingProgress}%</p>
    </div>
  );
};

IsLoading.propTypes = {
  introStateOptions: PropTypes.string.isRequired,
  introStateSetter: PropTypes.func.isRequired,
};

export default IsLoading;
