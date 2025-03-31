// TODO: Replace with dict API
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

Object.freeze(ADJECTIVES);
Object.freeze(NOUNS);

function generateRandomUsername() {
  const randomAdjective =
    ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const randomNoun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${randomAdjective}${randomNoun}${randomNumber}`;
}

function generateRandomPassword(length = 12) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export { generateRandomUsername, generateRandomPassword };
