const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'admin',
  database: 'dbodoo16',
});

client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL database!');
    return client.end();
  })
  .catch((err) => {
    console.error('Failed to connect to PostgreSQL database:', err);
  });
