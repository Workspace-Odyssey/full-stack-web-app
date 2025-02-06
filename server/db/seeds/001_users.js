/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { hashPassword } = require('../../src/util/passwordUtils'); 

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

 const users = [
    {
      uuid: '9b99857c-4346-4686-962b-c2ce4c1cf9e3',
      username: 'john_doe', 
      email: 'john.doe@example.com', 
      password: 'password1243'
    },
    { 
      uuid: '6ef29d68-660e-4a57-bd3e-266cd6dbf93f',
      username: 'jane_smith', 
      email: 'jane.smith@example.com', 
      password: 'securepassword6456' 
    },
    { 
      uuid: 'a0c9d7a6-cb62-418c-9d95-b44a6a2bab43',
      username: 'alice_jones', 
      email: 'alice.jones@example.com', 
      password: 'mypassword7589' 
    },
    { 
      uuid: '152fca67-30b3-4bd8-a5c9-09b85d0c5de7',
      username: 'quinn_wright', 
      email: 'quinn.wright@example.com', 
      password: 'qwinPW@_2020' 
    },
    { 
      uuid: '049f4efd-f9ed-4280-b5b8-adeb70e84030',
      username: 'rachel_young', 
      email: 'rachel.young@example.com', 
      password: 'raChEl@123' 
    },
    { 
      uuid: 'cb0c0658-380a-45a4-983b-8ff7b3ddfa7b',
      username: 'samuel_clark', 
      email: 'samuel.clark@example.com', 
      password: '1234Samuel' 
    }
  ]
  for(const user of users) {
    user.password = await hashPassword(user.password);
  };  
  await knex('users').insert(users);
}

