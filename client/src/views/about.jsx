import { motion } from 'motion/react';
import { animationOptions } from '../styles/animations';

const about = () => {
  return (
    <div
      className="container-fluid main-container"
      style={{ margin: '30vh 0vh' }}
    >
      <h1 className="display-3 fw-bolder mb-5" id="dashboard-title">
        About
      </h1>
      <section style={{ margin: '30vh 15vw' }}>
        <p className="chiryo_rounded chiryo_primary display-6">
          This is an undergrad project about mental
        </p>
      </section>

      <section style={{ margin: '30vh 15vw' }}>
        <p className="chiryo_rounded chiryo_primary display-6">
          This is some more random text, I may delete this page at some point
          probably not needed
        </p>
      </section>
    </div>
  );
};

export default about;
