const knex = require('../knex');

const User = {

    findOne: async (query) => {
        return knex('users').where(query).first();
    },

    create: async (data) => {
        return knex('users').insert(data).returning('*');
    }
}

module.exports = User;