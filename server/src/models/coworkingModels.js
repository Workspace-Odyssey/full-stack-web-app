const knex = require('../knex');

const Coworking = {

    findOne: async (name) => {
        return knex('coworkings').where(name).first();
    },

    create: async (data) => {
        return knex('coworkings').insert(data).returning('*');
    }
}

module.exports = Coworking;