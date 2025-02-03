import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';

const About = () => {
  return (
    <div className="container-fluid" style={{ padding: '15vh 7.5vw' }}>
      <section style={{ margin: '0vh 0vw 30vh 0vw' }}>
        <h1 className="display-3 fw-bolder mb-5" id="dashboard-title">
          About
        </h1>
        <motion.p
          {...animationOptions3}
          className="chiryo_rounded chiryo_primary display-6"
        >
          This is an undergrad project about mental health.
        </motion.p>
      </section>

      <section style={{ margin: '30vh 0vw' }}>
        <motion.p
          {...animationOptions3}
          className="chiryo_rounded chiryo_primary display-6"
        >
          This is some more random text, I may delete this page at some point
          probably not needed
        </motion.p>
      </section>
    </div>
  );
};

export default About;
