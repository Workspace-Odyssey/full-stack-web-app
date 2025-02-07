/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('coworkings', (table) => {
        table.string('google_place_id').notNullable().unique();
        table.dropColumn('numberOfRatings');
        table.dropColumn('avgOfRating');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.alterTable('coworkings', (table) => {
        table.dropColumn('google_place_id');
        table.integer('numberOfRatings').nullable();
        table.integer('avgOfRating').nullable().checkBetween([0, 5]);
    });
};