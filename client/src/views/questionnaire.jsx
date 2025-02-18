import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import {
  generateRandomPassword,
  generateRandomUsername,
} from '../api/generateUser';
import { motion } from 'motion/react';
import { animationOptions3, questionAniOptions } from '../styles/animations';
import { QUESTIONS, createProblem } from '../api/questions';
import IsLoading from './isLoading';
import Stars from '../components/stars';
import { ToastContainer, toast } from 'react-toastify';
import { registerUser } from '../api/crud';
import quizSound from '../assets/correct.mp3';
import { useCredentialStore } from '../state/state';
import { fetchJWT } from '../api/auth';

const introStateOptions = {
  START: 'START',
  MATCH: 'MATCH',
  GENCRED: 'GENCRED',
};

const Questionnaire = () => {
  const {
    role,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    introState,
    setIntroState,
    userId,
    setUser,
    username,
    setUsername,
    password,
    setPassword,
  } = useCredentialStore((state) => state);
  const [answers, setAnswers] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const textareaRef = useRef(null);

  const correctAudio = new Audio(quizSound);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const notify = () =>
    toast.success('Nice Job! +100 Points✨', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'light',
    });

  const notifyError = () =>
    toast.error(
      'Oops - looks like something went wrong! Refresh and try again 👍',
      {
        position: 'bottom-center',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
        type: 'error',
      },
    );

  /**
   * @description - Generates a random username for a new user
   */
  const updateGlobalCredentials = () => {
    setUsername(generateRandomUsername());
    setPassword(generateRandomPassword());
  };

  const handleAnswer = (formResponse) => {
    if (
      introState === introStateOptions.START &&
      currentQuestionIndex <= QUESTIONS.length - 1
    ) {
      setAnswers([...answers, formResponse.get('answer')]);
      setAnimate(true);

      textareaRef.current.value = '';

      setTimeout(() => {
        setAnimate(false);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1150);

      notify();
    } else {
      // Completion State
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      updateGlobalCredentials();
    }
  };

  /**
   *
   * @param {Object} formResponse
   * @description - Takes in the users responses, creates and registers a user, beings the process of matching a user to a therapist
   */
  const handleOptionalForm = (formResponse) => {
    const PROBLEM = createProblem(answers);
    const USER_DETAILS = JSON.stringify(Object.fromEntries(formResponse));
    setUserDetails(USER_DETAILS);

    console.log(PROBLEM);
    console.log(USER_DETAILS);
    const token = fetchJWT();

    if (userId && token && role != 'therapist') {
      // For reusability, if the user already exists, do not create another
      setIntroState(introStateOptions.MATCH);
    } else {
      // New User
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
        problem: PROBLEM,
      });

      if (userId) {
        setUser({ userId: id, role: 'user', firstLogin: true });
        setIntroState(introStateOptions.MATCH);
      } else {
        notifyError();
      }
    }
  };
  if (role === 'therapist') {
    return <div>Therapist are not allowed to do this stuff..</div>;
  } else if (introState === introStateOptions.START) {
    return (
      <div
        className="container-fluid vw-100 min-vh-100 d-flex justify-content-center"
        style={{
          padding: '20vh 5vw',
        }}
      >
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
        {currentQuestionIndex < QUESTIONS.length && (
          <Stars number={currentQuestionIndex} />
        )}
        <div className="w-75">
          <motion.div
            variants={questionAniOptions}
            initial="hidden"
            animate={animate ? 'hidden' : 'visible'}
          >
            <p className="display-3 fw-bolder mb-5" data-cy="question">
              {QUESTIONS[currentQuestionIndex]}
            </p>
            {currentQuestionIndex === 0 && (
              <small>
                It&apos;s okay! You can be honest, all your data will be
                encrypted and unreadable by anyone!
              </small>
            )}
          </motion.div>
          <motion.form
            variants={questionAniOptions}
            initial="hidden"
            animate={animate ? 'hidden' : 'visible'}
            onSubmit={(e) => {
              correctAudio.play();
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
                  data-cy="email"
                  required
                ></input>
                <input
                  placeholder="Age"
                  type="number"
                  name="age"
                  min="12"
                  max="100"
                  className="form-control mb-3"
                  data-cy="age"
                />
                <select
                  name="race"
                  data-cy="race"
                  className="form-control mb-3"
                >
                  <option value="">Select Race</option>
                  <option value="asian">Asian</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="hispanic">Hispanic</option>
                  <option value="other">Other</option>
                </select>
                <select
                  name="background"
                  data-cy="background"
                  className="form-control mb-3"
                >
                  <option value="">Select Ethnic Background</option>
                  <option value="asian">Asian</option>
                  <option value="african">African</option>
                  <option value="european">European</option>
                  <option value="latino">Latino</option>
                  <option value="other">Other</option>
                </select>
                <select
                  name="religion"
                  data-cy="religion"
                  className="form-control mb-3"
                >
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
                  data-cy="location"
                />
                <p>Anything else?</p>
                <input
                  placeholder="Enter any additional information..."
                  type="text"
                  name="additional"
                  className="form-control mb-3"
                  id="additionalInput"
                  data-cy="additional"
                />
              </div>
            )}
            {currentQuestionIndex < QUESTIONS.length && (
              <textarea
                ref={textareaRef}
                className="chiryo_textarea"
                type="text"
                name="answer"
                required={currentQuestionIndex !== QUESTIONS.length}
                style={{ fontSize: '4rem' }}
                data-cy="response"
                disabled={animate}
              />
            )}
            <div className="d-flex justify-content-start gap-2">
              {currentQuestionIndex > 0 && (
                <button
                  type="button"
                  data-cy="back"
                  className="chiryo_primary_active chiryo_rounded mt-5 d-flex justify-content-center"
                  onClick={() => {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                    textareaRef.current.value =
                      answers[currentQuestionIndex - 1];
                  }}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                data-cy="submit-answer"
                className="chiryo_primary_active chiryo_rounded mt-5 d-flex justify-content-center"
              >
                {currentQuestionIndex >= QUESTIONS.length ? 'Submit' : 'Next'}
                <i
                  className="bi bi-arrow-right-square-fill"
                  style={{ marginLeft: '10px' }}
                ></i>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    );
  } else if (introState === introStateOptions.MATCH) {
    return (
      <div style={{ paddingTop: '20vh' }}>
        <IsLoading introStateOptions={introStateOptions} />
      </div>
    );
  } else if (introState === introStateOptions.GENCRED) {
    return (
      <div className="min-vh-100">
        <motion.div
          {...animationOptions3}
          className="modal d-block show mt-5"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="credsModal"
          aria-hidden="false"
        >
          <div className="modal-dialog shadow" role="document">
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
                  data-cy="password"
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
              <div className="modal-footer d-flex justify-content-center">
                <button
                  style={{ backgroundColor: 'white', border: '2px solid' }}
                  onClick={() => setIntroState(introStateOptions.START)}
                  className="btn chiryo_rounded"
                >
                  Redo
                </button>
                <Link
                  href="/login"
                  type="button"
                  className="btn chiryo_primary chiryo_rounded"
                  data-cy="login-link"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
};

export default Questionnaire;
