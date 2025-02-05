/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { hashPassword } = require('../../src/util/passwordUtils'); 

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

 const users = [
    {username: 'john_doe', email: 'john.doe@example.com', password: 'password1243'},
    { username: 'jane_smith', email: 'jane.smith@example.com', password: 'securepassword6456' },
    { username: 'alice_jones', email: 'alice.jones@example.com', password: 'mypassword7589' },
    { username: 'quinn_wright', email: 'quinn.wright@example.com', password: 'qwinPW@_2020' },
    { username: 'rachel_young', email: 'rachel.young@example.com', password: 'raChEl@123' },
    { username: 'samuel_clark', email: 'samuel.clark@example.com', password: '1234Samuel' }]
  for(const user of users) {
    user.password = await hashPassword(user.password);
  };  
  await knex('users').insert(users);
}

