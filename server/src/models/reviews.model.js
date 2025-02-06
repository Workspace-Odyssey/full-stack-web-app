const knex = require('../knex');

const { validProps, requiredProps } = require('../util/validation');

const validateProps = validProps([
  'id',
  'content',
  'stars',
  'user_id',
  'coworking_id',
  'created_at'
]);

const validateRequired = requiredProps([
    'stars',
    'user_id',
    'coworking_id',
    'created_at'
]);

const REVIEW_TABLE = 'reviews';


module.exports = {
    REVIEW_TABLE,

    submit(review) {
        validateRequired(validateProps(review));
        return knex(REVIEW_TABLE).insert(review);
    },

    getNumberOfRatingsByCoWorkingId(id) {
        return knex(REVIEW_TABLE)
            .count('* as number_of_ratings')
            .where({ 'coworking_id': id })
    },

    getAverageRatingByCoWorkingId(id) {
        return knex(REVIEW_TABLE)
            .avg('stars as average_rating')
            .where({ 'coworking_id': id })
    },

    filterByCoWorkingId(id) {
        return knex
            .select({
                id: `${REVIEW_TABLE}.id`,
                coworkingId: `${REVIEW_TABLE}.coworking_id`,
                rating: `${REVIEW_TABLE}.stars`,
                datePosted: `${REVIEW_TABLE}.created_at`,
                reviewText: `${REVIEW_TABLE}.content`,
            })
            .from(REVIEW_TABLE)
            .innerJoin('coworkings', function () {
                this.on('coworkings.uuid', '=', `${REVIEW_TABLE}.coworking_id`);
              })
            .where({ [`${REVIEW_TABLE}.coworking_id`]: id })
            .orderBy(`${REVIEW_TABLE}.created_at`, 'desc')
    }
}