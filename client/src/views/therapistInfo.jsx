import { motion } from 'motion/react';
import { animationOptions } from '../styles/animations';

const therapistInfo = () => {
  return (
    <div className="container" style={{ margin: '15vh 5vw' }}>
      <section style={{ margin: '0vh 0vw 30vh 0vw' }}>
        <h1 className="display-3 fw-bolder mb-5" id="dashboard-title">
          Additional Information | Therapists
        </h1>
        <p className="text-center display-6"></p>
      </section>

      <section style={{ margin: '30vh 0vw' }}>
        <div className="row justify-content-evenly">
          <motion.div
            {...animationOptions}
            className="col-md-5 chiryo_rounded chiryo_primary p-3 p-md-5 h-full d-flex flex-column justify-content-between"
          >
            <h1 className="text-center display-4 fw-bolder mb-3">
              Technology and Reliability
            </h1>
            <p className="text-center display-6">
              Get access to people who can provide the help you need with no
              hassle
            </p>
          </motion.div>

          <div className="col-md-5 chiryo_rounded chiryo_primary p-3 p-md-5 h-full d-flex flex-column justify-content-between">
            <h1 className="text-center display-4 fw-bolder mb-3">
              Client Expectations
            </h1>
            <p className="text-center display-6">yap yap yap</p>
          </div>
        </div>
      </section>

      <section style={{ margin: '30vh 0vw' }}>
        <div className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5">
          <h1 className="text-center display-4 fw-bolder mb-3">
            Client Expectations
          </h1>
          <p className="text-center display-6">yap yap yap</p>
        </div>
      </section>

      <section style={{ margin: '30vh 0vw' }}>
        <h2 className="display-3 fw-bolder mb-5">
          Why join Chiryo instead of other sites?
        </h2>
        <div className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5">
          <ul>
            <li>
              <b>Set Your Own Schedule</b> – Take on as many (or as few) clients
              as you like. Your time, your rules.
            </li>
            <li>
              <b>Secure & Seamless</b> – Our platform is designed with privacy
              and security in mind, so both you and your clients can feel at
              ease.
            </li>
            <li>
              <b>Expand Your Reach</b> – Connect with clients beyond your local
              area and provide accessible care to those who need it.
            </li>
          </ul>
          <h2>
            Signing up is simple, and we’re here to support you every step of
            the way. Join a community of professionals making therapy more
            accessible, one session at a time!
          </h2>
        </div>
      </section>
    </div>
  );
};

export default therapistInfo;
