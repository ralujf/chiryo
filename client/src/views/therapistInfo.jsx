import { motion } from 'motion/react';
import { animationOptions } from '../styles/animations';

const therapistInfo = () => {
  return (
    <div className="container" style={{ margin: '15vh 5vw' }}>
      <h1 className="display-3 fw-bolder mb-5" id="dashboard-title">
        Additional Information | Therapists
      </h1>
      <section style={{ margin: '30vh 0vw' }}>
        <h2>A good therapist</h2>
        <p></p>
      </section>

      <section style={{ margin: '30vh 0vw' }}>
        <div className="row justify-content-between">
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
            <div className="d-flex justify-content-center mt-auto">
              <button className="display-6 fw-bolder text-dark chiryo_shadow chiryo_rounded chiryo_primary_action">
                <a
                  href="/questionnaire/"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Try it!
                </a>
              </button>
            </div>
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
        <h2 className="display-3 fw-bolder mb-5">
          Why join us instead of other sites?
        </h2>
        <p className="chiryo_rounded chiryo_primary display-6">
          Something about this service having more flexibility than places
        </p>
      </section>
    </div>
  );
};

export default therapistInfo;
