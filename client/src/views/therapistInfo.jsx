import { motion } from 'motion/react';
import { animationOptions } from '../styles/animations';

const therapistInfo = () => {
  return (
    <div
      className="container-fluid main-container"
      style={{ margin: '30vh 0vh' }}
    >
      <h1 className="display-3 fw-bolder mb-5" id="dashboard-title">
        Additional Information | Therapists
      </h1>
      <section style={{ margin: '30vh 15vw' }}>
        <h2>A good therapist</h2>
        <ul className="chiryo_rounded chiryo_primary display-6"></ul>
      </section>

      <section style={{ margin: '30vh 15vw' }}>
        <h2>Why join us instead of other sites?</h2>
        <p className="chiryo_rounded chiryo_primary display-6">
          Something about this service having more flexibility than places
        </p>
      </section>
    </div>
  );
};

export default therapistInfo;
