/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const parse = require('csv-parser');
const csv = require('fast-csv');
const path = require('path');

const originFilePath = path.join(__dirname, '../data/product.csv');
const destinationFilePath = path.join(__dirname, '../data/productCleaned.csv');

fs.writeFileSync(destinationFilePath, '');

const readableStream = fs.createReadStream(originFilePath);
const writableStream = fs.createWriteStream(destinationFilePath, { flags: 'a' });
const csvStream = csv.format({ headers: true });
csvStream.pipe(writableStream);

readableStream
  .pipe(parse())
  .on('data', (row) => {
    const newRow = { ...row };
    // if (row.id === "172") { debugger; }
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

    (() => { // log stuff
      // console.log(JSON.stringify(newRow.id, null, 2));
      // console.log(JSON.stringify(Object.keys(newRow)));
      // console.log('id:', JSON.stringify(newRow['id']));
      // console.log('name:', JSON.stringify(newRow[' name']));
      // console.log('slogan:', JSON.stringify(newRow[' slogan']));
      // console.log(JSON.stringify(newRow[' description']), '\n\n');
      // console.log(JSON.stringify(newRow[' category']));
      // console.log(JSON.stringify(newRow[' default_price']));
      // console.log(`${newRow.id}`, JSON.stringify(newRow[' default_price']));
    })();

    csvStream.write(newRow);
  })
  .on('end', () => {
    csvStream.end();
    // eslint-disable-next-line no-console
    console.log('CSV file successfully processed');
  });
