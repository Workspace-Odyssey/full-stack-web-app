/*

Note: until all API routes and database insertions are working please leave all console.log statements in place for error handling. 

*/

const knex = require("../knex");

const { validProps, requiredProps } = require("../util/validation");

const validateProps = validProps([
  'id',
  'content',
  'stars',
  'user_id',
  'coworking_id',
  'created_at',
  'net_rating',
  'comfort_rating',
  'noise_rating',
  'cost_rating',
  'has_private_rooms',
  'has_cafe',
  'has_parking',
  'has_aircon',
]);

const validateRequired = requiredProps([
  "stars",
  "user_id",
  "coworking_id",
  "created_at",
]);

const REVIEW_TABLE = "reviews";

module.exports = {
  REVIEW_TABLE,

  submit(review) {
    validateRequired(validateProps(review));
    return knex(REVIEW_TABLE).insert(review);
  },

  getNumberOfRatingsByCoWorkingId(id) {
    return knex(REVIEW_TABLE)
      .count("* as number_of_ratings")
      .where({ coworking_id: id })
      .first()
      .then((result) => result.number_of_ratings);
  },

  getAverageRatingByCoWorkingId(id) {
    return knex(REVIEW_TABLE)
      .avg("stars as average_rating")
      .where({ coworking_id: id })
      .first()
      .then((result) => result.average_rating);
  },

  // displays all reviews for a co-working space

  filterByCoWorkingId(id) {
    return knex
      .select({
        id: `${REVIEW_TABLE}.id`,
        rating: `${REVIEW_TABLE}.stars`,
        datePosted: `${REVIEW_TABLE}.created_at`,
        reviewText: `${REVIEW_TABLE}.content`,
        netRating: `${REVIEW_TABLE}.net_rating`,
        comfortRating: `${REVIEW_TABLE}.comfort_rating`,
        noiseRating: `${REVIEW_TABLE}.noise_rating`,
        costRating: `${REVIEW_TABLE}.cost_rating`,
        hasPrivateRooms: `${REVIEW_TABLE}.has_private_rooms`,
        hasCafe: `${REVIEW_TABLE}.has_cafe`,
        hasParking: `${REVIEW_TABLE}.has_parking`,
        hasAircon: `${REVIEW_TABLE}.has_aircon`,
        username: 'u.username',
      })
      .from(REVIEW_TABLE)
      .innerJoin("coworkings as c", function () {
        this.on("c.uuid", "=", `${REVIEW_TABLE}.coworking_id`);
      })
      .innerJoin("users as u", function () {
        this.on("u.uuid", "=", `${REVIEW_TABLE}.user_id`);
      })
      .where({ [`${REVIEW_TABLE}.coworking_id`]: id })
      .orderBy(`${REVIEW_TABLE}.created_at`, "desc");
  },

  checkExisting(userId, coworkingId) {
    return knex(REVIEW_TABLE)
      .where({
        user_id: userId,
        coworking_id: coworkingId,
      })
      .select();
  },
};
