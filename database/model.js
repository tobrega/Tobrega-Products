/* eslint-disable no-console */
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config);
const query = 'SELECT * FROM product WHERE product_id = 10';
// const query = 'SELECT * FROM product WHERE product_id = 10';

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(query);
    console.log(JSON.stringify(res.rows, null, 2));
    const timing = await client.query(`EXPLAIN ANALYZE ${query}`);
    console.log(timing.rows.slice(2).map((row) => Object.values(row)[0]).join('\n'));
    // console.log(JSON.stringify(Object.values(res.rows[2]).concat(Object.values(res.rows[3]))));
  } finally {
    client.release();
  }
})().catch((err) => console.log(err.stack));

// pool.query(query, (err, res) => {
//   if (err) throw err;
//   console.log(res);

//   pool.end();
// });
