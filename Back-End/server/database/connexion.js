import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'raleavie',
  user: 'postgres',
  password: 'untrucpouri'
});

(async () => {
  await client.connect()
})();

export default client;
