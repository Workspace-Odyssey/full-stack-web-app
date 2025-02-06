/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('reviews').del();
  await knex('coworkings').del();
  await knex('users').del();
};
