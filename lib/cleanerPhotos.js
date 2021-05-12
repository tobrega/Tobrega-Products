/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const parse = require('csv-parse');
const csv = require('fast-csv');
// const { format, parse } = require('fast-csv');
const path = require('path');

const originFilePath = path.join(__dirname, '../data_example/original/photos.csv');
const destinationFilePath = path.join(__dirname, '../data_example/cleaned/photos.csv');
// const originFilePath = path.join(__dirname, '../data/original/photos.csv');
// const destinationFilePath = path.join(__dirname, '../data/cleaned/photos.csv');

fs.writeFileSync(destinationFilePath, '');

const readableStream = fs.createReadStream(originFilePath);
const writableStream = fs.createWriteStream(destinationFilePath, { flags: 'a' });
const csvStream = csv.format({ headers: true });
csvStream.pipe(writableStream);

let rowCount = 0;

const columns = {
  id: {},
  style_id: {},
  url: {},
  thumbnail_url: {},
  count: {},
};

const startTime = Date.now();

readableStream
  .pipe(parse({
    headers: true,
    columns: true,
    relax_column_count: true,
    escape: false,
    quote: false,
  }))
  .on('data', (row) => {
    // console.log('row:', row);
    rowCount += 1;
    if (rowCount % 100000 === 0) { console.log(rowCount); }
    const newRow = { ...row };
    // console.log(newRow);
    // console.log(JSON.stringify(newRow.thumbnail_url));
    if (newRow.thumbnail_url === undefined) {
      newRow.thumbnail_url = newRow.url;
    }

    // newRow.quantity = newRow.quantity.trim();

    newRow.url = newRow.url.replace(/"/g, '');
    newRow.thumbnail_url = newRow.thumbnail_url.replace(/"/g, '');

    const [id, style_id, url, thumbnail_url] = Object.values(newRow);
    const idType = typeof Number(id);
    columns.id[idType] = columns.id[idType] + 1 || 1;

    const styleIdType = typeof Number(style_id);
    columns.style_id[styleIdType] = columns.style_id[styleIdType] + 1 || 1;

    columns.url[url.length] = columns.url[url.length] + 1 || 1;
    columns.thumbnail_url[thumbnail_url.length] = columns.thumbnail_url[thumbnail_url.length] + 1 || 1;

    const count = Object.values(newRow).length;
    columns.count[count] = columns.count[count] + 1 || 1;


    // if (!newRow.default_price) {
    // newRow.default_price = newRow.category;
    //   newRow.category = newRow.description;
    //   newRow.description = newRow.slogan;
    //   newRow.slogan = '';
    // }

    // csvStream.write(row);
    csvStream.write(newRow);
  })
  .on('end', () => {
    csvStream.end();
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(columns, null, 2));
    console.log(`CSV file successfully processed in ${(Date.now() - startTime) / 1000} seconds`);
  });
