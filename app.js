const express = require('express');
const morgan = require('morgan');
const products = require('./routes/products');

const app = express();

const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/products', products);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
