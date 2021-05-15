const express = require('express');
const morgan = require('morgan');
const products = require('./routes/products');

const app = express();

const PORT = 3000;

// app.use(morgan('dev'));
app.use(express.json());

app.use('/products', products);

// for loader.io verification
app.get('/loaderio-4ae48528e78e767a9c740680c10093da', (req, res) => {
  console.log('sending loader.io verification');
  res.status(204).send('loaderio-4ae48528e78e767a9c740680c10093da');
});
// above is for loader.io verification

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
