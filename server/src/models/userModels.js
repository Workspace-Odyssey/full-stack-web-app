const knex = require('../knex');

const User = {

    findOne: async (email) => {
        return knex('users').where(email).first();
    },

    create: async (data) => {
        return knex('users').insert(data).returning('*');
    }
}


module.exports = User;