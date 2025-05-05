import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { matchUserWithTherapists } from '../api/crud';
import { useIdentityStore } from '../state/state';
import { INTRO_STATE_OPTIONS } from '../components/introState';

const LOADING_TEXT = [
  'Watching the rain fall... 🌧️',
  'Searching through the stars... ✨',
  'Sun gazing... ☀️',
  'Vibing and trying...',
  'Looking somewhere in the luscious fields... 🌳',
  'Texting the bros... 📱 ',
  'Soul searching... 💙',
  'Talking to Lin... 🎓',
  'Gimme one sec...',
  'Just a little more... 🎯',
  'Hold on tight!',
  'Playing with kittens... 🐈',
  'Procrastinating about life',
  'Listening to Yitai Wang 😌 🎶',
  'Get ready!',
  'Finding the perfect match for you... 🫂',
];

Object.freeze(LOADING_TEXT);

const IsLoading = ({ introStateOptions, signInId = null }) => {
  const { setIntroState, userId } = useIdentityStore((state) => state);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [text, setText] = useState('Generating your match...');

  const COMPLETION = 100;
  const INCREMENT = 3.33;
  const LIMIT = 10;

  useEffect(() => {
    console.log(signInId);
    console.log(userId);
    if (signInId && !userId) {
      matchUserWithTherapists({ data: { userId: signInId } });
    } else if (userId) {
      matchUserWithTherapists({ data: { userId: userId } });
    } else {
      setIntroState(INTRO_STATE_OPTIONS.START);
    }
  }, [userId, signInId, setIntroState]);

  useEffect(() => {
    let incrementor = Math.floor(Math.random() * (LIMIT + 1)) + 1;

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (
          prevProgress >= COMPLETION ||
          prevProgress + INCREMENT > COMPLETION
        ) {
          clearInterval(interval);
          return COMPLETION;
        }
        let value = prevProgress + incrementor;
        value = Math.min(value, COMPLETION);
        return value;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [COMPLETION]);

  useEffect(() => {
    if (loadingProgress >= COMPLETION) {
      setIntroState(introStateOptions.GENCRED);
    }
  }, [loadingProgress, COMPLETION, setIntroState, introStateOptions.GENCRED]);

  useEffect(() => {
    const interval = setInterval(() => {
      let num = Math.floor(Math.random() * LOADING_TEXT.length);

      setText(LOADING_TEXT[num]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex flex-column align-items-center min-vh-100">
      <p className="display-4">{text}</p>
      <div className="progress w-75">
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
  introStateOptions: PropTypes.object.isRequired,
  signInId: PropTypes.string,
};

export default IsLoading;
