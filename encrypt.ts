import { encrypt } from './utils/crypto';

console.log("USER:", encrypt("Admin"));
console.log("PASS:", encrypt("admin123"));