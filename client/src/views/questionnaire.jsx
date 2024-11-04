import { useState, useRef } from 'react';
import QUESTIONS from '../api/questions';

const introStateOptions = {
  START: 'START',
  MATCH: 'MATCH',
  GENCRED: 'GENCRED',
};

// TODO: Perform AI implementation, (Add headers to params to store when account is created)
// TODO: Generate user credentials
// TODO: Show Completion Message and prompt user to sign up

const Questionnaire = () => {
  const [introState, setIntroSet] = useState(introStateOptions.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const formArea = useRef();

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (
      introState === introStateOptions.START &&
      currentQuestionIndex < QUESTIONS.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('All questions answered:', answers);
      setIntroSet(introStateOptions.MATCH);
    }
  };

  if (introStateOptions.START) {
    return (
      <div
        className="container-fluid d-flex justify-content-center"
        style={{ width: '100vw' }}
      >
        <div ref={formArea} className="w-75">
          <p className="display-3 fw-bolder mb-5">
            {QUESTIONS[currentQuestionIndex]}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAnswer(formData.get('answer'));
            }}
          >
            <div className="mb-3">
              <label>
                <input type="radio" name="answer" value="Option 1" required />
                Option 1
              </label>
            </div>
            <div className="mb-3">
              <label>
                <input type="radio" name="answer" value="Option 2" required />
                Option 2
              </label>
            </div>
            <div className="mb-3">
              <label>
                <input type="radio" name="answer" value="Option 3" required />
                Option 3
              </label>
            </div>
            <button
              type="submit"
              className="btn chiryo_primary chiryo_rounded mt-5"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    );
  } else if (introStateOptions.MATCH) {
    return <div></div>;
  } else if (introStateOptions.GENCRED) {
    return <div></div>;
  } else {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: '3rem', height: '3rem' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default Questionnaire;
