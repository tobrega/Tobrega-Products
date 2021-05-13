/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const parse = require('csv-parser');
const csv = require('fast-csv');
const path = require('path');

const originFilePath = path.join(__dirname, '../data/original/product.csv');
const destinationFilePath = path.join(__dirname, '../data/cleaned/productCleaned.csv');

fs.writeFileSync(destinationFilePath, '');

const readableStream = fs.createReadStream(originFilePath);
const writableStream = fs.createWriteStream(destinationFilePath, { flags: 'a' });
const csvStream = csv.format({ headers: true });
csvStream.pipe(writableStream);

let rowCount = 0;

readableStream
  .pipe(parse())
  .on('data', (row) => {
    rowCount += 1;
    if (rowCount % 100000 === 0) { console.log(rowCount); }
    const newRow = { ...row };
    if (!newRow.default_price) {
      newRow.default_price = newRow.category;
      newRow.category = newRow.description;
      newRow.description = newRow.slogan;
      newRow.slogan = '';
    }
    newRow.default_price = newRow.default_price ? newRow.default_price
      .trim()
      .replace(/\$/, '')
      .replace(/"default_price": /, '') : '';

    csvStream.write(newRow);
  })
  .on('end', () => {
    csvStream.end();
    // eslint-disable-next-line no-console
    console.log('CSV file successfully processed');
  });
