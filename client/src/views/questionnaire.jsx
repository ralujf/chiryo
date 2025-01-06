import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import {
  generateRandomPassword,
  generateRandomUsername,
} from '../api/generateData';
import { motion } from 'motion/react';
import { questionAniOptions } from '../styles/animations';
import { QUESTIONS, PROMPTS } from '../api/questions';
import IsLoading from './isLoading';
import Stars from '../components/stars';
import { ToastContainer, toast } from 'react-toastify';
import { useCredentialStore } from '../state/state';
import { registerUser } from '../api/crud';

const introStateOptions = {
  START: 'START',
  MATCH: 'MATCH',
  GENCRED: 'GENCRED',
};

const Questionnaire = () => {
  const [introState, setIntroSet] = useState(introStateOptions.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const textareaRef = useRef(null);

  const userId = useCredentialStore((state) => state.userId);
  const username = useCredentialStore((state) => state.username);
  const password = useCredentialStore((state) => state.password);

  const setUsername = useCredentialStore.getState().setUsername;
  const setPassword = useCredentialStore.getState().setPassword;
  const setID = useCredentialStore.getState().setID;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const notify = () =>
    toast.success('+100 Points🦄', {
      position: 'bottom-center',
      autoClose: 2000,
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

  const handleAnswer = (formResponse) => {
    if (
      introState === introStateOptions.START &&
      currentQuestionIndex < QUESTIONS.length - 1
    ) {
      setAnswers([
        ...answers,
        PROMPTS[currentQuestionIndex] + formResponse.get('answer'),
      ]);
      setAnimate(true);

      textareaRef.current.value = '';

      setTimeout(() => {
        setAnimate(false);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1500);

      notify();
    } else {
      // Completion State
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      updateGlobalCredentials();
    }
  };

  const handleOptionalForm = (formResponse) => {
    setUserDetails(formResponse);
    console.log(userDetails);
    const { email, age, race, background, religion, location } = userDetails;
    const id = registerUser({
      username: username,
      password: password,
      email: email,
      age: age,
      race: race,
      background: background,
      religion: religion,
      location: location,
    });
    console.log('All questions answered:', answers);
    setID(id);
    setIntroSet(introStateOptions.MATCH);
  };

  if (introState === introStateOptions.START) {
    return (
      <div
        className="container-fluid d-flex justify-content-center"
        style={{
          width: '100vw',
          height: '175vh',
          maxWidth: '100%',
          minHeight: '100vh',
          padding: '15vh 5vw',
        }}
      >
        {currentQuestionIndex < QUESTIONS.length && (
          <Stars number={currentQuestionIndex} />
        )}
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
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
          <motion.p
            variants={questionAniOptions}
            initial="hidden"
            animate={animate ? 'hidden' : 'visible'}
            className="display-3 fw-bolder mb-5"
          >
            {QUESTIONS[currentQuestionIndex]}
          </motion.p>
          {currentQuestionIndex === 0 && (
            <small>
              It&apos;s okay! You can be honest, all your data will be encrypted
              and unreadable by anyone!
            </small>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              if (currentQuestionIndex >= QUESTIONS.length) {
                handleOptionalForm(formData);
              } else {
                handleAnswer(formData);
              }
            }}
          >
            {currentQuestionIndex >= QUESTIONS.length && (
              <div>
                <small className="text-muted text-center mb-4">
                  While these fields are not necessary, they&apos;d really help
                  find better matches! However, if you want to skip, press next
                </small>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="form-control mb-3"
                  required
                ></input>
                <input
                  placeholder="Age"
                  type="number"
                  name="age"
                  min="12"
                  max="100"
                  className="form-control mb-3"
                />
                <select name="race" className="form-control mb-3">
                  <option value="">Select Race</option>
                  <option value="asian">Asian</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="hispanic">Hispanic</option>
                  <option value="other">Other</option>
                </select>
                <select name="ethnicBackground" className="form-control mb-3">
                  <option value="">Select Ethnic Background</option>
                  <option value="asian">Asian</option>
                  <option value="african">African</option>
                  <option value="european">European</option>
                  <option value="latino">Latino</option>
                  <option value="other">Other</option>
                </select>
                <select name="religion" className="form-control mb-3">
                  <option value="">Select Religion</option>
                  <option value="christianity">Christianity</option>
                  <option value="islam">Islam</option>
                  <option value="hinduism">Hinduism</option>
                  <option value="buddhism">Buddhism</option>
                  <option value="other">Other</option>
                </select>
                <input
                  placeholder="Location"
                  type="text"
                  name="location"
                  className="form-control mb-3"
                  id="locationInput"
                />
                <p>Anything else?</p>
              </div>
            )}
            <textarea
              ref={textareaRef}
              className="chiryo_textarea"
              type="text"
              name="answer"
              required
              style={{ fontSize: '2rem' }}
              disabled={animate}
            />
            <button
              type="submit"
              className="btn chiryo_primary chiryo_rounded mt-5 d-flex justify-content-center"
            >
              {currentQuestionIndex >= QUESTIONS.length ? 'Submit' : 'Next'}
              <i
                className="bi bi-arrow-right-square-fill"
                style={{ marginLeft: '10px' }}
              ></i>
            </button>
          </form>
        </div>
      </div>
    );
  } else if (introState === introStateOptions.MATCH) {
    return (
      <IsLoading
        introStateOptions={introStateOptions}
        introStateSetter={setIntroSet}
        userId={userId}
      />
    );
  } else if (introState === introStateOptions.GENCRED) {
    return (
      <div
        className="modal show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="credsModal"
        aria-hidden="true"
        style={{ minHeight: '100vh' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="credsModal">
                Your account details are...
              </h5>
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
              <Link
                href="/login"
                type="button"
                className="btn chiryo_primary chiryo_rounded chiryo_button"
              >
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
