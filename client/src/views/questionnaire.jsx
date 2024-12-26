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
  const [userDetails, setUserDetails] = useState({});
  const textareaRef = useRef(null);

  const userId = useCredentialStore((state) => state.userId);
  const username = useCredentialStore((state) => state.username);
  const password = useCredentialStore((state) => state.password);

  const setUsername = useCredentialStore.getState().setUsername;
  const setPassword = useCredentialStore.getState().setPassword;
  const setID = useCredentialStore.getState().setID;

  let optionalForm = false;

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
      const { email, age, race, background, religion, location } = userDetails;
      // Need to also address the fact that if the user do not entire the required fields then there matching will be completely random
      // TODO: Make sure this actually returns the newly saved user id if the registration is successful
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
      setID(id);
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
              setUserDetails(formData);
              textareaRef.current.value = '';
            }}
          >
            {optionalForm && (
              <div>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  pattern=".+@example\.com"
                  required
                ></input>
                <small className="text-muted text-center">
                  While these fields are not necessary, they&apos;d really help
                  find better matches! However, if you want to skip, press next
                </small>
                <input
                  placeholder="Age"
                  type="number"
                  name="age"
                  min="1"
                  max="120"
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
              </div>
            )}
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
              <button onClick={() => getTherapists(userId)}>
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
