/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const parse = require('csv-parser');
const csv = require('fast-csv');
const path = require('path');

// const originFilePath = path.join(__dirname, '../data/example/related.csv');
// const destinationFilePath = path.join(__dirname, '../data/example/relatedCleaned.csv');
const originFilePath = path.join(__dirname, '../data/related.csv');
const destinationFilePath = path.join(__dirname, '../data/relatedCleaned.csv');

fs.writeFileSync(destinationFilePath, '');

const readableStream = fs.createReadStream(originFilePath);
const writableStream = fs.createWriteStream(destinationFilePath, { flags: 'a' });
const csvStream = csv.format({ headers: true });
csvStream.pipe(writableStream);

// let logged = false;
let rowCount = 0;

const columns = {
  id: {},
  current_product_id: {},
  related_product_id: {},
  count: {},
};

const startTime = Date.now();

readableStream
  .pipe(parse())
  .on('data', (row) => {
    rowCount += 1;
    if (rowCount % 100000 === 0) { console.log(rowCount); }

    const newRow = { ...row };
    // if (newRow.quantity === undefined) {
    //   newRow.quantity = newRow.size;
    //   newRow.size = 'na';
    // }

    // newRow.quantity = newRow.quantity.trim();

    const [id, current_product_id, related_product_id] = Object.values(newRow);
    const idType = typeof Number(id);
    columns.id[idType] = columns.id[idType] + 1 || 1;

    const current_product_idType = typeof Number(current_product_id);
    columns.current_product_id[current_product_idType] = columns.current_product_id[current_product_idType] + 1 || 1;

    const related_product_idType = typeof Number(related_product_id);
    columns.related_product_id[related_product_idType] = columns.related_product_id[related_product_idType] + 1 || 1;

    const count = Object.values(newRow).length;
    columns.count[count] = columns.count[count] + 1 || 1;

    // if (!logged) {
    //   // console.log(JSON.stringify(keys));
    //   logged = true;
    // }
    // console.log(newRow[keys[4]]);

    // if (!newRow.default_price) {
    // newRow.default_price = newRow.category;
    //   newRow.category = newRow.description;
    //   newRow.description = newRow.slogan;
    //   newRow.slogan = '';
    // }

    // newRow.original_price = newRow.original_price ? newRow.original_price
    //   .trim()
    //   .replace(/\$/, '') : '';

    (() => { // log stuff
      // console.log(JSON.stringify(newRow.id, null, 2));
      // console.log(JSON.stringify(newRow));
      // console.log('id:', JSON.stringify(newRow['id']));
      // console.log('name:', JSON.stringify(newRow[' name']));
      // console.log('slogan:', JSON.stringify(newRow[' slogan']));
      // console.log(JSON.stringify(newRow[' description']), '\n\n');
      // console.log(JSON.stringify(newRow[' category']));
      // console.log(newRow.original_price);
      // console.log(`${newRow.id}`, JSON.stringify(newRow[' default_price']));
    })();

    csvStream.write(newRow);
  })
  .on('end', () => {
    csvStream.end();
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(columns, null, 2));
    console.log(`CSV file successfully processed in ${(Date.now() - startTime) / 1000} seconds`);
  });
