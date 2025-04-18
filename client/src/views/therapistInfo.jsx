import { motion } from 'motion/react';
import { animationOptions } from '../styles/animations';

const therapistInfo = () => {
  return (
    <div className="container p-5">
      <section className="mt-5">
        <h1 className="display-3 fw-bolder">
          Additional Information | Therapists
        </h1>
      </section>

      <section className="mt-5">
        <motion.div
          {...animationOptions}
          className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5"
        >
          <h1 className="text-center display-4 fw-bolder mb-3">
            Technology and Reliability
          </h1>
          <p className="text-center display-6">
            Online therapy can be a different experience compared to in-person
            sessions. Some clients may need help adjusting to a virtual setting,
            and others may expect immediate availability.
            <br></br>
            <br></br>
            Setting clear boundaries for response times, session lengths, and
            communication outside of scheduled sessions is important to prevent
            burnout and maintain a healthy work-life balance.
            <br></br>
            <br></br>
            Though this platform is not a platform to host sessions, it is
            important to understand and sympathize with any issues that the user
            may face with non face to face appointments.
          </p>
        </motion.div>
      </section>

      <section className="mt-5">
        <motion.div
          {...animationOptions}
          className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5"
        >
          <h1 className="text-center display-4 fw-bolder mb-3">
            Client Expectations
          </h1>
          <p className="text-center display-6">
            Online therapy can be a different experience compared to in-person
            sessions. Some clients may need help adjusting to a virtual setting,
            and others may expect immediate availability. Setting clear
            boundaries for response times, session lengths, and communication
            outside of scheduled sessions is important to prevent burnout and
            maintain a healthy work-life balance. Though this platform is not a
            platform to host sessions, it is important to understand and
            sympathize with any issues that the user may face with non face to
            face appointments.
          </p>
        </motion.div>
      </section>

      <section className="mt-5">
        <motion.div
          {...animationOptions}
          className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5"
        >
          <h1 className="text-center display-4 fw-bolder mb-3">
            Client Privacy & Confidentiality
          </h1>
          <p className="text-center display-6">
            Chiryo is designed with security in mind, using encrypted messaging
            and video calls to protect client confidentiality. However,
            it&apos;s still essential to follow GDPA/HIPAA (or relevant privacy
            laws in your region) when managing client data.
          </p>
        </motion.div>
      </section>

      <section className="mt-5">
        <h2 className="display-3 fw-bolder mb-5">
          Why join Chiryo instead of other sites?
        </h2>
        <motion.div
          {...animationOptions}
          className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5 display-6"
        >
          <ul>
            <li className="mb-5">
              <b>Set Your Own Schedule</b> &ndash; Take on as many (or as few)
              clients as you like. Your time, your rules.
            </li>
            <li className="mb-5">
              <b>Secure & Seamless</b> &ndash; Our platform is designed with
              privacy and security in mind, so both you and your clients can
              feel at ease.
            </li>
            <li>
              <b>Expand Your Reach</b> &ndash; Connect with clients beyond your
              local area and provide accessible care to those who need it.
            </li>
          </ul>
        </motion.div>
        <motion.p {...animationOptions} className="display-4 mt-5 mb-5">
          Signing up is simple, and we&apos;re here to support you every step of
          the way. Join a community of professionals making therapy more
          accessible, one session at a time!
        </motion.p>
      </section>
    </div>
  );
};

export default therapistInfo;
