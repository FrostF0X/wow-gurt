exports.up = function (knex) {
    return knex.schema.createTable('wow', (table) => {
        table.string('tokenId').primary();
        table.string('tokenUrl').notNullable();
        table.string('image').notNullable();
        table.string('image128').notNullable();
        table.string('image256').notNullable();
        table.string('image512').notNullable();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.string('seed').notNullable();
        table.text('config').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('wow');
};
