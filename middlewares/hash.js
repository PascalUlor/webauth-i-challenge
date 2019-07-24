const md5 = require('md5');
const uuid = require('uuid');

const cipher = {
  /**
   *
   * @param {string} rawPassword
   * @param {number} rounds
   * @param {string} salt is optional
   * @returns {string} md5$<rounds>$<encodedSalt>$<hash>
   */
  createHash(rawPassword, rounds = 2 ** 12, salt = uuid()) {
    let hash = md5(rawPassword + salt);
    for (let i = 0; i < rounds; i++) {
      hash = md5(hash);
    }
    const encodedSalt = Buffer.from(salt).toString('base64');
    return `md5$${rounds}$${encodedSalt}$${hash}`;
  },

  /**
   *
   * @param {string} rawPassword
   * @param {string} cipher md5$<rounds>$<encoded salt>$<hash>
   * @returns {boolean} whether the supplied password matches supplied hash
   */
  compare(rawPassword, rawCipher) {
    const [, rounds, encodedSalt] = rawCipher.split('$');
    console.log(rawCipher.split('$'));
    const salt = Buffer.from(encodedSalt, 'base64').toString('ascii');
    return this.createHash(rawPassword, Number(rounds), salt) === rawCipher;
  }
};

module.exports = cipher;
