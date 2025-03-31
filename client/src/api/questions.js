const QUESTIONS = [
  'How are you feeling today?',
  'When was the last time you had an episode?',
  'Do you ever feel like you are alone or have no one to talk to?',
  'If there was anything that you could have right now, what would it be?',
  'What do you like to do in your free time?',
];

const PROMPTS = [
  'I am feeling ',
  'The last time I had an episode was ',
  '',
  '',
  'In my free time I like to ',
];

Object.freeze(QUESTIONS);
Object.freeze(PROMPTS);

const createProblem = (answers) => {
  return answers
    .reduce((acc, answer, index) => {
      if (typeof answer != 'string') answer = String(answer);
      let trimmedAnswer = `${PROMPTS[index]}${answer}`.trim();
      if (!/[.!?]$/.test(trimmedAnswer)) {
        trimmedAnswer += '.';
      }
      return acc + ' ' + trimmedAnswer;
    }, '')
    .trim();
};

export { QUESTIONS, PROMPTS, createProblem };
