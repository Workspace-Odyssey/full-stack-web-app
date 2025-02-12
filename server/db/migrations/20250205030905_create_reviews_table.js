/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('reviews', (table) => {
    table.increments('id').primary();
    table.text('content').nullable();
    table.integer('stars').notNullable().checkBetween([1, 5]);
    table.integer('net_rating').checkBetween([1, 5]);
    table.integer('comfort_rating').checkBetween([1, 5]);
    table.integer('noise_rating').checkBetween([1, 5]);
    table.integer('cost_rating').checkBetween([1, 5]);
    table
      .uuid('user_id')
      .references('uuid')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('coworking_id')
      .references('uuid')
      .inTable('coworkings')
      .onDelete('CASCADE');
    table.date('created_at').notNullable();
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reviews');
};
