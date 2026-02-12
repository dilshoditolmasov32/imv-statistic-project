import CryptoJS from 'crypto-js';

interface PKCEPair {
  verify: string;
  challenge: string;
}


const generate = (length: number = 32): PKCEPair => {
  const verify: string = createRandom(length);
  const challenge: string = base64Url(CryptoJS.SHA256(verify));
  
  return {
    verify,
    challenge,
  };
};


const base64Url = (str: CryptoJS.lib.WordArray): string => {
  return str.toString(CryptoJS.enc.Base64)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};


const createRandom = (num: number): string => {
  return [...Array(num)]
    .map(() => Math.random().toString(36)[2])
    .join('');
};

export default generate;