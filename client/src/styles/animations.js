import { spring } from 'motion/react';

const animationOptions = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2 },
  },
  viewport: { once: true },
};

const questionAniOptions = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  viewport: { once: true },
};

const animateHelper = { type: spring, bounce: 0.3, duration: 0.8 };

export { animationOptions, questionAniOptions, animateHelper };
