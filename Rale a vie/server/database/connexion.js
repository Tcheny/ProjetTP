const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'raleavie',
  user: 'postgres',
  password: 'untrucpouri'
});

// initialiser une connexion a la bdd
(async () => {
  await client.connect()
})();

module.exports= client;
