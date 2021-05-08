/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const parse = require('csv-parser');
const csv = require('fast-csv');
const path = require('path');

// const originFilePath = path.join(__dirname, '../data/example/original/styles.csv');
// const destinationFilePath = path.join(__dirname, '../data/example/cleaned/styles.csv');
const originFilePath = path.join(__dirname, '../data/original/styles.csv');
const destinationFilePath = path.join(__dirname, '../data/cleaned/styles.csv');

fs.writeFileSync(destinationFilePath, '');

const readableStream = fs.createReadStream(originFilePath);
const writableStream = fs.createWriteStream(destinationFilePath, { flags: 'a' });
const csvStream = csv.format({ headers: true });
csvStream.pipe(writableStream);

const columns = {
  id: {},
  productId: {},
  name: {},
  sale_price: {},
  original_price: {},
  default_style: {},
  count: {},
};

let rowCount = 0;
const startTime = Date.now();

readableStream
  .pipe(parse())
  .on('data', (row) => {
    rowCount += 1;
    if (rowCount % 100000 === 0) { console.log(rowCount); }
    const newRow = { ...row };

    // modifications to the data
    newRow.sale_price = newRow.sale_price ? newRow.sale_price
      .trim()
      .replace(/\$/, '') : '';
    newRow.original_price = newRow.original_price ? newRow.original_price
      .trim()
      .replace(/\$/, '') : '';
    newRow.default_style = newRow.default_style === '1' ? '1' : '0';

    // logging
    const [id,
      productId,
      name,
      sale_price,
      original_price,
      default_style] = Object.values(newRow);

    const idType = typeof Number(id);
    columns.id[idType] = columns.id[idType] + 1 || 1;

    const sale_priceType = typeof Number(sale_price);
    columns.sale_price[sale_priceType] = columns.sale_price[sale_priceType] + 1 || 1;

    const original_priceType = typeof Number(original_price);
    columns.original_price[original_priceType] = columns.original_price[original_priceType] + 1 || 1;

    columns.default_style[default_style] = columns.default_style[default_style] + 1 || 1;

    const count = Object.values(newRow).length;
    columns.count[count] = columns.count[count] + 1 || 1;

    csvStream.write(newRow);
  })
  .on('end', () => {
    csvStream.end();
    console.log(JSON.stringify(columns, null, 2));
    console.log(`CSV file successfully processed in ${(Date.now() - startTime) / 1000} seconds`);
  });
