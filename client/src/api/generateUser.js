const ADJECTIVES = [
  'Quick',
  'Elated',
  'Happy',
  'Bold',
  'Cute',
  'Bright',
  'Dark',
  'Clever',
  'Brave',
  'Calm',
];

const NOUNS = [
  'Fox',
  'Dog',
  'Cat',
  'Mouse',
  'Bear',
  'Lion',
  'Tiger',
  'Wolf',
  'Eagle',
  'Shark',
];

const LIMIT = 1000;

Object.freeze(ADJECTIVES);
Object.freeze(NOUNS);

const generateRandomUsername = () => {
  const randomAdjective =
    ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];

  const randomNoun = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  const randomNumber = Math.floor(Math.random() * LIMIT);

  return `${randomAdjective}${randomNoun}${randomNumber}`;
};

const generateRandomPassword = (length = 12) => {
  const CHARS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let password = '';

  for (let i = 0; i < length; i++) {
    password += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }

  return password;
};

export { generateRandomUsername, generateRandomPassword };
