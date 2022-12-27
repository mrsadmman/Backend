const { option } = require('../db/config/configDB');
const knex = require('knex')(option);

knex.schema
  .createTable('productos', (table) => {
    table.increments('id'), table.string('name'), table.string('price'), table.string('thumbnail');
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

knex('productos')
  .insert([
    {
      name: 'Vodka',
      price: 50,
      thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_659260-MLA31352532052_072019-O.webp',
    },
    {
      name: 'Fernet',
      price: 200,
      thumbnail: 'https://almacenfamily.com/productos/fernet-branca-750.png',
    },
    {
      name: 'Whisky',
      price: 1200,
      thumbnail: 'https://vinotecamasis.com.ar/wp-content/uploads/2021/11/Whisky-Johnnie-Walker-Double-Black-750-ml.png',
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
