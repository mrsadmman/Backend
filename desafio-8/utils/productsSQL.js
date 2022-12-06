const { option } = require('../db/config/configDB');
const knex = require('knex')(option);

/* Crear la tabla de productos */
knex.schema
  .createTable('productos', (table) => {
    table.increments('id'), table.string('nombre'), table.string('precio'), table.string('thumbnail');
  })
  .then(() => {
    console.log('La tabla se creo correctamente');
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });

/*  Insertar todo el array de productos  */
knex('productos')
  .insert([
    {
      nombre: 'Adidas shoes',
      precio: 1100,
      thumbnail: '../public/img/adidas-shoes.jpg',
    },
    {
      nombre: 'Nike ball',
      precio: 600,
      thumbnail: '../public/img/nike-ball.jpg',
    },
    {
      nombre: 'Nike shoes',
      precio: 1200,
      thumbnail: '../public/img/nike-shoes.jpg',
    },
  ])
  .then(() => {
    console.log(`Se insertaron los productos `);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
