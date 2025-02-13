const knex = require('../knex');

const { validProps, requiredProps } = require('../util/validation');

const validateProps = validProps([
    'id',
    'uuid',
    'name',
    'location',
    'google_place_id'
]);

const validateRequired = requiredProps([
    'name',
    'location',
    'google_place_id'
]);

const Coworking = {

    findByName: async (name) => {
        return knex('coworkings').where('name', name).first();
    },

    findByGooglePlaceID: async (id) => {
        return knex('coworkings').where('google_place_id', id).first();
    },

    create: async (data) => {
        validateRequired(data);
        validateProps(data)
        return knex('coworkings').insert(data).returning('*');
    },

    getRandomCoworkingSpaces: async () => {
        return knex('coworkings').orderByRaw('RANDOM()').limit(5);
    }
}

module.exports = Coworking;