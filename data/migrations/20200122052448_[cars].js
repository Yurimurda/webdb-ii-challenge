exports.up = function(knex, Promise) {
    return knex.schema.createTable('cars', tbl => {
          tbl.increments();

          tbl.string('make', 35).notNullable();

          tbl.string('model', 35).notNullable();

          tbl.integer('mileage');

          tbl.string('transmission', 15)

          tbl.string('title', 15)
          }) 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars'); 
};