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
    console.err(err);
    throw err;
  }
});

router.get('/:id/styles', async (req, res) => {
  try {
    console.log('getting styles');
    const productId = req.params.id;
    const start = Date.now();

    const stylesQuery = await db.query('SELECT * FROM styles WHERE product_id = $1', [productId]);
    console.log(`It took ${Date.now() - start} ms to retrieve styles`);

    const styles = stylesQuery.rows;
    console.log(styles);

    // const [photosQuery, skusQuery] = await Promise.all([
    //   db.query('SELECT * FROM product WHERE product_id = $1', [productId]),
    //   db.query('SELECT feature, value FROM features WHERE product_id = $1', [productId]),
    // ]);

    // const productInfo = { ...productInfoQuery.rows[0], features };
    res.send(styles);
    console.log(`Executed queries in ${duration} ms`);
  } catch (err) {
    console.err(err);
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
