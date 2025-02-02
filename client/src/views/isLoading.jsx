import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTherapists } from '../api/crud';

const funnyStuff = [
  // a bit bored ngl
  'Searching through the stars... ✨',
  'Talking to Lin... 🎓',
  'Gimme one sec...',
  'Hold on tight!',
  'Playing with kittens... 🐈',
  'Procrastinating about life',
  'Listening to Yitai Wang 😌 🎶',
];
// TODO: think about putting this into global state
const IsLoading = ({ introStateOptions, introStateSetter, userId }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [text, setText] = useState('Generating your match...');
  getTherapists(userId);

  useEffect(() => {
    const interval = setInterval(() => {
      let num = Math.floor(Math.random() * funnyStuff.length);
      setText(funnyStuff[num]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let incrementor = Math.floor(Math.random() * 10);
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100 || prevProgress + 3.33 > 100) {
          clearInterval(interval);
          // TODO: Defo wrong way of doing this, refactor at some point to use global state instead of external mutation
          introStateSetter(introStateOptions.GENCRED);
          return 100;
        }
        let value = prevProgress + incrementor;
        value = Math.min(value, 100);
        return value;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [introStateOptions.GENCRED, introStateSetter]);

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <p className="display-4">{text}</p>
      <div className="progress" style={{ width: '80%' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${loadingProgress}%` }}
          aria-valuenow={loadingProgress}
          aria-valuemin="0"
          aria-valuemax="100"
          data-cy="loading"
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
