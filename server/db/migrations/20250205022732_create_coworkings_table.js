/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('coworkings', (table) => {
        table.increments('id').primary();
        table.uuid('uuid').notNullable().unique().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.string('location').nullable();
        table.integer('numberOfRatings').nullable();
        table.integer('avgOfRating').nullable().checkBetween([0, 5]);
    });
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('coworkings');
}
