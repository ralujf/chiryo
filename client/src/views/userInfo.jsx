import { motion } from 'motion/react';
import { animationOptions } from '../styles/animations';

const userInfo = () => {
  return (
    <div className="container" style={{ margin: '15vh 5vw' }}>
      <section style={{ margin: '0vh 0vw 30vh 0vw' }}>
        <h1
          className="display-3 text-center fw-bolder mb-5"
          id="dashboard-title"
        >
          Why is mental health important?
        </h1>
        <p className="text-center display-6">
          This is a test to see what it will look like on the page
        </p>
      </section>
      <section style={{ margin: '30vh 0vw' }}>
        <h1
          className="display-3 text-center fw-bolder mb-5"
          id="dashboard-title"
        >
          Ways of improving mental health
        </h1>
        <div className="row justify-content-evenly">
          <motion.div
            {...animationOptions}
            className="col-md-5 chiryo_rounded chiryo_primary p-3 p-md-5 h-full d-flex flex-column justify-content-between"
          >
            <h1 className="text-center display-4 fw-bolder mb-3">
              Find a Therapist
            </h1>
            <p className="text-center display-6">
              Get access to people who can provide the help you need with no
              hassle
            </p>
          </motion.div>

          <div className="col-md-5 chiryo_rounded chiryo_primary p-3 p-md-5 h-full d-flex flex-column justify-content-between">
            <h1 className="text-center display-4 fw-bolder mb-3">
              more yap to see if the styling fits
            </h1>
            <p className="text-center display-6">yap yap yap</p>
          </div>
        </div>
      </section>

      <section className="" style={{ margin: '30vh 0vw' }}>
        <h2 className="display-3 fw-bolder mb-5">Other Recommended Services</h2>
        <div className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5">
          <h2>You must have...</h2>
          <ul>
            <li>Testimonials from previous clients</li>
            <li>
              Degree in field of Psychology, Nursing or other Mental
              Health/Social Work Studies
            </li>
            <li>Strong & demonstrable communication skills</li>
            <li>Professional Accreditation (BACP, NCS, UKCP)</li>
            <li>Good Vibes ☀️</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default userInfo;
