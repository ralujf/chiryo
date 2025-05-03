const animationOptions = {
  initial: {
    opacity: 0,
    scale: 0.85,
  },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2 },
  },
  viewport: { once: true },
};

const animationOptions2 = {
  initial: {
    opacity: 0,
    scale: 1,
  },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5 },
  },
  viewport: { once: true },
};

const animationOptions3 = {
  initial: {
    opacity: 0,
    y: 50,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5 },
    easeOut: { duration: 0 },
  },
  viewport: { once: true },
};

const animationOptions4 = {
  initial: {
    opacity: 0,
    y: 50,
    rotate: 180,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    rotate: 360,
    transition: { duration: 2 },
    easeOut: { duration: 0.5 },
  },
  viewport: { once: true },
};

const questionAniOptions = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  viewport: { once: true },
};
export {
  animationOptions,
  animationOptions2,
  animationOptions3,
  animationOptions4,
  questionAniOptions,
};
