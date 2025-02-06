/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.uuid('uuid').notNullable().unique().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('username').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
    });
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
}
