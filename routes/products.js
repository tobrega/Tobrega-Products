const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const productListQuery = await db.query(`
    SELECT array_to_json(array_agg(p))
    FROM (
      SELECT
        product_id AS id,
        name,
        slogan,
        description,
        category,
        default_price
      FROM product
      LIMIT $1 OFFSET $2
    ) p
  `, [count, page * count - count]);

  //   const relatedQuery = await db.query(`
  //   SELECT (array_agg(related_product_id))
  //   FROM related
  //   WHERE current_product_id = $1
  // `, [productId]);

  const productList = productListQuery.rows[0].array_to_json;
  // console.log(productList);
  res.send(productList);
});

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // const start = Date.now();

    // // One Query
    // const productInfoQuery = await db.query(`
    // SELECT
    //   product_id,
    //   name,
    //   slogan,
    //   description,
    //   category,
    //   default_price,
    //   (
    //     SELECT array_to_json(array_agg(row_to_json(f))) as results
    //     FROM (
    //       SELECT
    //         feature,
    //         value
    //       FROM features
    //       WHERE product_id = $1
    //     ) f
    //   )
    //   FROM product
    //   WHERE product_id = $1
    // `, [productId]);
    // const productInfo = productInfoQuery.rows[0];

    // Two Queries
    const [productInfoQuery, featuresQuery] = await Promise.all([
      db.query('SELECT * FROM product WHERE product_id = $1', [productId]),
      db.query('SELECT feature, value FROM features WHERE product_id = $1', [productId]),
    ]);
    const features = featuresQuery.rows;
    const productInfo = { ...productInfoQuery.rows[0], features };

    // const duration = Date.now() - start;
    res.send(productInfo);
    // console.log(productInfo);
    // console.log(`Executed queries in ${duration} ms`);
  } catch (err) {
    console.error(err);
    throw err;
  }
});

router.get('/:id/styles', async (req, res) => {
  try {
    const productId = req.params.id;
    const start = Date.now();

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
            WHERE product_id = $1
          ) s
        )
      FROM styles
      WHERE product_id = $1
`, [productId],
    );

    const styles = stylesQuery.rows[0];
    // console.log(JSON.stringify(styles, null, 2));

    res.send(styles);
  } catch (err) {
    console.error(err);
    throw err;
  }
});

router.get('/:id/related', async (req, res) => {
  try {
    const productId = req.params.id;
    const start = Date.now();

    /*

    SELECT array_agg(row_to_json(r))
    FROM (
      SELECT related_product_id
      FROM related
      WHERE current_product_id = $1
    ) r
    //  returns {
      "array_agg": [
        {"related_product_id": 2},
        {"related_product_id": 3},
        {"related_product_id": 8},
        {"related_product_id": 7}
      ]
    }

    SELECT (array_agg(r))
    FROM (
      SELECT related_product_id
      FROM related
      WHERE current_product_id = $1
    ) r
    //  returns {"array_agg":"{(2),(3),(8),(7)}"}

    SELECT related_product_id
    FROM related
    WHERE current_product_id = $1
    //  returns {"related_product_id":2}

    SELECT (array_agg(related_product_id))
    FROM related
    WHERE current_product_id = $1
    //  returns {"array_agg":[2,3,8,7]}

    SELECT ARRAY(
      SELECT related_product_id
      FROM related
      WHERE current_product_id = $1
    )
    // returns {"array":[2,3,8,7]}

    SELECT ARRAY(r)
    FROM (
      SELECT related_product_id
      FROM related
      WHERE current_product_id = $1
    ) r
    //  returns error

      SELECT ARRAY(
        SELECT json_extract_path_text(r, 'array') FROM
        json_array_elements(
          (SELECT related_product_id
          FROM related
          WHERE current_product_id = $1)::json->'array'
        as r)
      )
      // returns error

      SELECT ARRAY (json_array_elements(
        SELECT related_product_id
        FROM related
        WHERE current_product_id = $1
      )
      //  returns error

    */

    const relatedQuery = await db.query(
      `
      SELECT ARRAY(
        SELECT related_product_id
        FROM related
        WHERE current_product_id = $1
      )
        `, [productId],
    );

    const related = relatedQuery.rows[0].array;

    // console.log(`It took ${Date.now() - start} ms to retrieve related products`);
    // console.log(related);
    // console.log(JSON.stringify(related, null, 2));

    res.send(related);
  } catch (err) {
    console.error(err);
    throw err;
  }
});

module.exports = router;

