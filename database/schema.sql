CREATE DATABASE IF NOT EXISTS products;

USE products;

DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS related;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;

CREATE TABLE [IF NOT EXISTS] product (
  product_id INT UNSIGNED PRIMARY KEY,
  name VARCHAR(127);
  slogan VARCHAR(MAX);
  description VARCHAR(MAX);
  category VARCHAR(127);
  default_price DECIMAL(10,2);
);

-- COPY product FROM '/data/product.csv' WITH (format csv, header);

-- CREATE TABLE [IF NOT EXISTS] related (
--   relationship_id INT UNSIGNED PRIMARY KEY,
--   current_product_id INT UNSIGNED FOREIGN KEY;
--   related_product_id INT UNSIGNED;
-- );

-- COPY related FROM '/data/related.csv' WITH (format csv, header);

-- CREATE TABLE [IF NOT EXISTS] features (
--   feature_id INT UNSIGNED PRIMARY KEY,
--   product_id INT UNSIGNED FOREIGN KEY;
--   feature VARCHAR(127);
--   value VARCHAR(127);
-- );

-- COPY features FROM '/data/features.csv' WITH (format csv, header);

-- CREATE TABLE [IF NOT EXISTS] styles (
--   style_id INT UNSIGNED PRIMARY KEY,
--   product_id INT UNSIGNED FOREIGN KEY;
--   name VARCHAR(127);
--   sale_price DECIMAL(9,2);
--   original_price DECIMAL(9,2);
--   default_style TINYINT(1);
-- );

-- COPY styles FROM '/data/styles.csv' WITH (format csv, header);

-- CREATE TABLE [IF NOT EXISTS] photos (
--   photo_id INT UNSIGNED PRIMARY KEY,
--   style_id INT UNSIGNED FOREIGN KEY;
--   url VARCHAR(MAX);
--   thumbnail_url VARCHAR(MAX);
-- );

-- COPY photos FROM '/data/photos.csv' WITH (format csv, header);

-- CREATE TABLE [IF NOT EXISTS] skus (
--   sku_id INT UNSIGNED PRIMARY KEY,
--   style_id INT UNSIGNED FOREIGN KEY;
--   size VARCHAR(31);
--   quantity SMALLINT;
-- );

-- COPY skus FROM '/data/skus.csv' WITH (format csv, header);
