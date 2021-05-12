const express = require('express');
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const start = Date.now();
    const [productInfoQuery, featuresQuery] = await Promise.all([
      db.query('SELECT * FROM product WHERE product_id = $1', [productId]),
      db.query('SELECT feature, value FROM features WHERE product_id = $1', [productId]),
    ]);
    const duration = Date.now() - start;
    const features = featuresQuery.rows;
    const productInfo = { ...productInfoQuery.rows[0], features };
    res.send(productInfo);
    console.log(`Executed queries in ${duration} ms`);
  } catch (err) {
    console.error(err);
    throw err;
  }
});

router.get('/:id/styles', async (req, res) => {
  try {
    console.log('getting styles');
    const productId = req.params.id;
    const start = Date.now();
    // const stylesQuery = await db.query('SELECT * FROM styles s LEFT OUTER JOIN photos p ON s.style_id = p.style_id WHERE s.product_id = $1;', [productId]);
    // const stylesQuery = await db.query('SELECT row_to_json(styles) FROM styles WHERE product_id = $1', [productId]);

    // const stylesQuery = await db.query(
    //   `SELECT row_to_json(t) 
    //   FROM (
    //     SELECT product_id
    //       (
    //         SELECT array_to_json(array_agg(row_to_json(p)))
    //         FROM(
    //           SELECT thumbnail_url, url
    //           FROM photos
    //           WHERE styles.id = photos.styleId
    //         ) p
    //       ) as photos
    //     FROM styles
    //     WHERE product_id = $1
    //   ) t`
    //   , [productId]);


    // select array_to_json(array_agg(row_to_json(p))) as photos
    // from (
    //   SELECT thumbnail_url, url
    //   FROM photos
    //   WHERE style_id = $1
    // ) p


    // SELECT product.product_id,

    // FROM product
    // LEFT JOIN styles ON product.product_id = styles.product_id
    // LEFT JOIN skus ON styles.style_id = skus.style_id
    // WHERE product.product_id = $1

    // SELECT skus.quantity, skus.size


    // SELECT array_to_json(array_agg(row_to_json(s))) AS skus
    
    // SELECT array_agg(sku_id, 
    //   SELECT quantity, size
    //   FROM skus
    //   WHERE style_id = $1
    // ) as each
    

    // this returns an array of styles
    // SELECT array_to_json(array_agg(row_to_json(s))) as results
    // FROM (
    //   SELECT * from styles
    //   WHERE product_id = $1
    // ) s

    

    const stylesQuery = await db.query(
      `

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
              ) photos
              
            FROM styles
            WHERE product_id = $1
          ) s
        )
      FROM styles
      WHERE product_id = $1

 `, [productId],
    );

    console.log(`It took ${Date.now() - start} ms to retrieve styles`);
    const styles = stylesQuery.rows[0];
    console.log(JSON.stringify(styles, null, 2));

    // const [photosQuery, skusQuery] = await Promise.all([
    //   db.query('SELECT * FROM product WHERE product_id = $1', [productId]),
    //   db.query('SELECT feature, value FROM features WHERE product_id = $1', [productId]),
    // ]);

    // const productInfo = { ...productInfoQuery.rows[0], features };

    const duration = Date.now() - start;
    res.send(styles);
    console.log(`Executed queries in ${duration} ms`);
  } catch (err) {
    console.error(err);
    throw err;
  }
});

router.get('/', (req, res) => {
  console.log('get root');
  // db.query(query, [req.params.product_id], (err, res) => {
  //   if (err) { return next(err); }
  //   return res.send(res.rows[0]);
  // });
  res.send('get product root');
});

module.exports = router;
