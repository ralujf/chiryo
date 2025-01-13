// TODO: Replace with dict API
const adjectives = [
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

const nouns = [
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

function generateRandomUsername() {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
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
