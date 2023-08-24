exports.up = function (knex) {
    return knex.schema.createTable('ape_lucky_coin', (table) => {
        table.string('tokenId').primary();
        table.string('image').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('ape_lucky_coin');
};
