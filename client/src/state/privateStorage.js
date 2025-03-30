import crypto from 'crypto';
import { Buffer } from 'buffer';

const CRYPTO_KEY = import.meta.env.VITE_CRYPTO_KEY;
const ALGORITHM = 'aes-256-cbc';
// Salt key for AES needs to be 256 bits/ 32 bytes
const KEY_LENGTH = 32;
const WORD = 16;
const KEY = crypto.scryptSync(CRYPTO_KEY, 'salt', KEY_LENGTH);

export const privateStorage = {
  getItem: (name) => {
    const data = localStorage.getItem(name);
    if (!data) return null;
    try {
      const [ivHex, encryptedHex] = data.split(':');
      // Init vector used with key and algo to decipher the saved data
      const iv = Buffer.from(ivHex, 'hex');
      const encrypted = Buffer.from(encryptedHex, 'hex');
      const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
      const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ]);
      return decrypted.toString('utf8');
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  setItem: (name, value) => {
    const iv = crypto.randomBytes(WORD);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    const encrypted = Buffer.concat([
      cipher.update(value, 'utf8'),
      cipher.final(),
    ]);
    localStorage.setItem(
      name,
      `${iv.toString('hex')}:${encrypted.toString('hex')}`,
    );
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};
