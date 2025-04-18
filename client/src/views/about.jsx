import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';

const About = () => {
  return (
    <div className="container-fluid p-5 mt-5">
      <section>
        <h1 className="display-3 fw-bolder mb-5">About</h1>
        <motion.p
          {...animationOptions3}
          className="chiryo_rounded chiryo_primary display-6"
        >
          This is an undergraduate project about mental health. The aim is to
          provide an easier way to interact with a therapist.
        </motion.p>
      </section>

      <section className="mt-5">
        <motion.p
          {...animationOptions3}
          className="chiryo_rounded chiryo_primary display-6"
        >
          This project utilizes technology that will become increasing prevalent
          in the following years with the rapidly developments in the space of
          artificial intelligence
        </motion.p>
      </section>
    </div>
  );
};

export default About;
