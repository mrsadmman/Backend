const { option } = require('../db/config/sqlite');
const knex = require('knex')(option);

knex.schema
  .createTable('mensajes', (table) => {
    table.increments('id'), table.string('socketid'), table.string('timestamp'), table.string('mensaje'), table.string('email');
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

knex('mensajes')
  .insert([
    {
      socketid: '27oH1Jl62kuWubiqAAAD',
      timestamp: '4:40 pm',
      email: 'juanchi@gmail.com',
      mensaje: 'hello',
      id: 1,
    },
    {
      socketid: 'z1sCXrDPHOm_QosvAAAD',
      timestamp: '3:15 pm',
      email: 'JUANCHITO@gmail.com',
      mensaje: 'eeeeeee',
      id: 2,
    },
  ])
  .then(() => {
    console.log(`Se insertaron los mensajes `);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
