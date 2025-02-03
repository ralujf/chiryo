import { motion } from 'motion/react';
import { animationOptions, animationOptions3 } from '../styles/animations';

const userInfo = () => {
  return (
    <div className="container" style={{ padding: '15vh 7.5vw' }}>
      <section style={{ margin: '0vh 0vw 30vh 0vw' }}>
        <h1
          className="display-3 text-center fw-bolder mb-5"
          id="dashboard-title"
        >
          Why is mental health important?
        </h1>
        <p className="text-center display-6">
          Mental health isn’t just about handling big life challenges—it’s the
          foundation for everything we do, from how we handle stress to how we
          connect with others. Just like we exercise to keep our bodies strong,
          taking care of our minds helps us stay balanced, focused, and ready to
          tackle whatever life throws our way. Whether it’s therapy, self-care,
          or just taking a deep breath on a tough day, mental well-being matters
          for everyone. After all, a healthy mind makes for a happier, more
          fulfilling life!
        </p>
      </section>
      <section style={{ margin: '30vh 0vw' }}>
        <h1
          className="display-3 text-center fw-bolder mb-5"
          id="dashboard-title"
        >
          Cornerstones of improving mental health
        </h1>
        <div className="row justify-content-evenly gap-5">
          <motion.div
            {...animationOptions}
            className="col-md-5 chiryo_rounded chiryo_primary p-3 p-md-5 h-full d-flex flex-column justify-content-between"
          >
            <h1 className="text-center display-4 fw-bolder mb-3">
              Prioritise Sleep
            </h1>
            <p className="text-center display-6">
              Aim for 7–9 hours of quality sleep each night to help regulate
              mood, energy, and cognitive function
            </p>
          </motion.div>

          <motion.div
            {...animationOptions}
            className="col-md-5 chiryo_rounded chiryo_primary p-3 p-md-5 h-full d-flex flex-column justify-content-between"
          >
            <h1 className="text-center display-4 fw-bolder mb-3">
              Stay Active
            </h1>
            <p className="text-center display-6">
              Regular exercise, even a short daily walk, can boost mood and
              reduce stress
            </p>
          </motion.div>

          <motion.div
            {...animationOptions}
            className="col-md-5 chiryo_rounded chiryo_primary p-3 p-md-5 h-full d-flex flex-column justify-content-between"
          >
            <h1 className="text-center display-4 fw-bolder mb-3">
              Connect with Others
            </h1>
            <p className="text-center display-6">
              Strong social connections improve mental well-being and provide
              emotional support
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ margin: '30vh 0vw' }}>
        <h2 className="display-3 fw-bolder mb-5">Other Recommended Services</h2>
        <motion.div
          {...animationOptions3}
          className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5"
        >
          <h2>
            Here are a couple of services to help out if Chiryo alone is not
            having the desired results!
          </h2>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://www.ihasco.co.uk/blog/8-simple-rules-for-improving-daily-mental-wellbeing"
              >
                Guidelines of mental health
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://moseley.bham.sch.uk/wp-content/uploads/wb35510-10-golden-rules-of-mental-health-wellbeing-1.pdf"
              >
                10 Golden Rules of Mental Health Wellbeing
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.mentalhealth.org.uk/explore-mental-health/publications/our-best-mental-health-tips"
              >
                Best Mental Health Tips | Mental Health Foundation
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/"
              >
                Steps to mental wellbeing | NHS
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.mind.org.uk/information-support/tips-for-everyday-living/wellbeing/"
              >
                Improving your mental wellbeing | Mind
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.ewc.wales/site/index.php/en/fitness-to-practise/good-practice-guides/good-practice-guide-mental-health-and-wellbeing"
              >
                Good Practices for Mental Health | CGA / EWC
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.healthdirect.gov.au/good-mental-health#:~:text=If%20you%20have%20good%20mental,feeling%20of%20being%20at%20peace."
              >
                Defining Good Mental Health | HealthDirect
              </a>
            </li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
};

export default userInfo;
