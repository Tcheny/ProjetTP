import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'raleavie',
  user: 'postgres',
  password: ''
});

client.on('error', (err) => {
    console.log('Erreur émise par le client postgres: ', err)
})

client.connect()

export default client;
