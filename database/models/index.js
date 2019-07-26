const db = require('../dbConfig');

const find = () => {
  return db('users');
};

const findUser = username => {
  return db('users').where({ username });
};

const addUser = async user => {
  const [id] = await db('users').insert(user);
  return db('users').where({ id });
};

module.exports = {
  addUser,
  find,
  findUser
};
