const express = require('express');
const morgan = require('morgan');
const products = require('./routes/products');
const config = require('./config');

const app = express();

const PORT = 3000;

// app.use(morgan('dev'));
app.use(express.json());

app.use('/products', products);

// for loader.io verification
app.get(`/${config.loaderio}`, (req, res) => {
  res.send(config.loaderio);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
