exports.up = function (knex) {
    return knex.schema.createTable('wow_lucky_coin', (table) => {
        table.string('tokenId').primary();
        table.string('image').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('wow_lucky_coin');
};
