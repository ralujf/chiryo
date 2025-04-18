import { motion } from 'motion/react';
import { animationOptions2, animationOptions3 } from '../styles/animations';
import topHero from '../assets/chiryohero1.png';
import mentalHealthChart from '../assets/chart.png';
import bottomHero from '../assets/chiryohero2.png';

const Main = () => {
  return (
    <div className="container-fluid p-5 mt-5">
      <div className="row justify-content-center chiryo_rounded">
        <div className="col-md-5 chiryo_rounded p-3 p-md">
          <motion.div {...animationOptions3}>
            <img src={topHero} alt="hero" className="w-100" />
          </motion.div>
        </div>

        <div className="col chiryo_rounded chiryo_primary p-3 p-md-5 h-full d-flex flex-column justify-content-between">
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
        </div>
      </div>

      <div className="py-5">
        <div className="row">
          <motion.img
            {...animationOptions3}
            src={mentalHealthChart}
            alt="hero"
            width={'25%'}
          />
          <motion.h1
            {...animationOptions3}
            style={{
              position: 'absolute',
              left: '50%',
              top: '140%',
              fontSize: '20vw',
              fontWeight: 'bolder',
            }}
          >
            20%
          </motion.h1>
          <div className="d-flex justify-content-center">
            <motion.p
              className="text-center display-3 fw-bolder"
              {...animationOptions3}
            >
              1 in 5 Young adults suffer from mental health issues, you
              aren&apos;t alone
            </motion.p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center chiryo_rounded mt-5 pt-5">
        <div className="col mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5">
          <h1 className="text-center display-3 fw-bolder mb-3">
            Why Use Chiryo?
          </h1>
          <p className="text-center display-6">
            Digital only solutions are often ineffective
          </p>

          <p className="text-center display-6">
            We strive to save you time and make the process of getting help
            easier
          </p>
        </div>

        <div className="col-md-5 chiryo_rounded">
          <motion.img
            {...animationOptions3}
            src={bottomHero}
            alt="hero"
            className="w-100"
          />
        </div>
      </div>

      <div className="row mt-5 pt-5">
        <motion.a
          {...animationOptions2}
          className="text-center fw-bold display-3 chiryo_primary_action chiryo_rounded"
          href="mailto:r.fajobi@se21.qmul.ac.uk"
        >
          <p style={{ color: '#212529' }}>Contact us</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="160"
            height="160"
            fill="#212529"
            className="bi bi-envelope"
            viewBox="0 0 16 16"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
};

export default Main;
