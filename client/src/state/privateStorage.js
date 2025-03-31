import CryptoJS from 'crypto-js';

const CRYPTO_KEY = import.meta.env.VITE_CRYPTO_KEY;
const SALT = 'salt';
const KEY_LENGTH = 256 / 32; // 256 bits = 32 bytes

// Generate key using PBKDF2 (crypto-js equivalent to scrypt)
const KEY = CryptoJS.PBKDF2(CRYPTO_KEY, SALT, {
  keySize: KEY_LENGTH,
  iterations: 1000,
});

export const privateStorage = {
  getItem: (name) => {
    const data = localStorage.getItem(name);
    if (!data) return null;
    try {
      const [ivHex, encryptedHex] = data.split(':');

      // Parse IV and encrypted data from hex
      const iv = CryptoJS.enc.Hex.parse(ivHex);
      const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);

      // Create the cipher params object
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: encrypted,
      });

      // Decrypt the data
      const decrypted = CryptoJS.AES.decrypt(cipherParams, KEY, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  setItem: (name, value) => {
    // Generate random IV (16 bytes)
    const iv = CryptoJS.lib.WordArray.random(16);

    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(value, KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Store IV and ciphertext as hex strings
    localStorage.setItem(
      name,
      `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(
        CryptoJS.enc.Hex,
      )}`,
    );
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};
