const db = require('../db');

const query = 'SELECT * FROM products WHERE product_id = $1';

app.get('/:id', (req, res, next) => {
  db.query(query, [req.params.product_id], (err, res) => {
    if (err) { return next(err); }
    return res.send(res.rows[0]);
  });
});











/**
 *
 * @param {number} page
 * @param {number} count
 * @returns {Array} Returns all product level information for a specified product id.
 */
 const listProducts = (page = 1, count = 5) => {

};

/**
 *
 * @param {number} product_id
 * @returns {Object} Returns all product level information for a specified product id.
 */
const productInformation = (product_id) => {

};

/**
 *
 * @param {number} product_id
 * @returns {object} Returns the all styles available for the given product.
 */
const productStyles = (product_id) => {

};

/**
 *
 * @param {number} product_id
 * @returns {Array} Returns the id's of products related to the product specified.
 */
const relatedProducts = (product_id) => {

};