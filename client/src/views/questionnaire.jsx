import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import {
  generateRandomPassword,
  generateRandomUsername,
} from '../api/generateData';
import QUESTIONS from '../api/questions';
import IsLoading from './isLoading';
import Stars from '../components/stars';
import { ToastContainer, toast } from 'react-toastify';
import { useCredentialStore } from '../state/state';
import { registerUser, getTherapists } from '../api/crud';

const introStateOptions = {
  START: 'START',
  MATCH: 'MATCH',
  GENCRED: 'GENCRED',
};

const Questionnaire = () => {
  const [introState, setIntroSet] = useState(introStateOptions.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const textareaRef = useRef(null);
  const username = useCredentialStore((state) => state.username);
  const password = useCredentialStore((state) => state.password);
  const setUsername = useCredentialStore.getState().setUsername;
  const setPassword = useCredentialStore.getState().setPassword;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const notify = () =>
    toast.success('+100 Points🦄', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'light',
    });

  const updateGlobalCredentials = () => {
    setUsername(generateRandomUsername());
    setPassword(generateRandomPassword());
  };

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (
      introState === introStateOptions.START &&
      currentQuestionIndex < QUESTIONS.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // TODO (Maybe): Depending on the index, append a sentence started to give the google AI model context
      notify();
    } else {
      updateGlobalCredentials();

      // TODO: Add form information
      // Need to also address the fact that i fthe user do not entire the requied fields then there matching will be completely random
      registerUser({ username: username, password: password });
      console.log('All questions answered:', answers);
      setIntroSet(introStateOptions.MATCH);
    }
  };

  if (introStateOptions.START) {
    return (
      <div
        className="container-fluid d-flex justify-content-center"
        style={{
          width: '100vw',
          height: '140vh',
          maxWidth: '100%',
          minHeight: '100vh',
          padding: '15vh 5vw',
        }}
      >
        <Stars number={currentQuestionIndex} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="light"
        />
        <div className="w-75">
          <p className="display-3 fw-bolder mb-5">
            {QUESTIONS[currentQuestionIndex]}
          </p>
          <small>
            It&apos;s okay! You can be honest, all your data will be encrypted
            and unreadable by anyone!
          </small>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAnswer(formData.get('answer'));
              textareaRef.current.value = '';
            }}
          >
            <textarea
              ref={textareaRef}
              className="chiryo_textarea"
              type="text"
              name="answer"
              required
            />
            <button
              type="submit"
              className="btn chiryo_primary chiryo_rounded mt-5 d-flex justify-content-center"
            >
              Next{' '}
              <i
                className="bi bi-arrow-right-square-fill"
                style={{ marginLeft: '10px' }}
              ></i>
            </button>
          </form>
        </div>
      </div>
    );
  } else if (introStateOptions.MATCH) {
    return (
      <IsLoading
        introStateOptions={introStateOptions}
        introStateSetter={setIntroSet}
      />
    );
  } else if (introStateOptions.GENCRED) {
    return (
      <div
        className="modal show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="credsModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="credsModal">
                Your account details are...
              </h5>
              <button onClick={() => getTherapists(currentUserId)}>
                Find Matches
              </button>
            </div>
            <div className="modal-body text-center">
              <p>
                Awesome work! We&apos;ll send you some therapist as soon as
                possible - be sure to check your email!
              </p>
              <p>Your user credentials have been generated successfully.</p>
              <h5>{username}</h5>
              <small>Click the password to reveal</small>
              <h5
                onClick={(e) => {
                  if (e.currentTarget.innerText == '*******') {
                    e.currentTarget.innerText = password;
                  } else {
                    e.currentTarget.innerText = '*******';
                  }
                }}
              >
                *******
              </h5>
            </div>
            <div className="modal-footer">
              <Link href="/login" type="button" className="btn chiryo_button">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Questionnaire;
