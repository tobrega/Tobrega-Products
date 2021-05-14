const express = require('express');
const morgan = require('morgan');
const products = require('./routes/products');

const app = express();

const PORT = 3000;

// app.use(morgan('dev'));
app.use(express.json());

app.use('/products', products);

// between this and the next comment is a test.
const { Pool } = require('pg');
const config = require('./config');
const pool = new Pool(config);
const queryString = `
    SELECT product_id, 
      (
        SELECT array_to_json(array_agg(row_to_json(s))) as results
        FROM (
          SELECT
            style_id,
            name,
            original_price,
            sale_price,
            default_style AS "default?",
            (
              SELECT array_to_json(array_agg(row_to_json(p)))
              FROM (
                SELECT
                  thumbnail_url,
                  url
                FROM photos
                WHERE photos.style_id = styles.style_id
              ) p
            ) photos,
            (
              SELECT json_object_agg(sku_id, json_build_object('quantity', quantity, 'size', size))
              FROM (
                SELECT
                  sku_id,
                  quantity,
                  size
                FROM skus
                WHERE skus.style_id = styles.style_id
              ) k
            ) skus
          FROM styles
          WHERE product_id = 1
        ) s
      )
    FROM styles
    WHERE product_id = 1;
    `;
app.get('/test', (req, res) => {
  pool.query(queryString)
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch(() => res.sendStatus(500));
});
// before this is a test

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
