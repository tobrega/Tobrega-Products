CREATE DATABASE IF NOT EXISTS products;

USE products;

CREATE TABLE [IF NOT EXISTS] product (
  product_id INT UNSIGNED PRIMARY KEY,
  name VARCHAR(127);
  slogan VARCHAR(MAX);
  description VARCHAR(MAX);
  category VARCHAR(127);
  default_price DECIMAL(10,2);
);

CREATE TABLE [IF NOT EXISTS] related (
  relationship_id INT UNSIGNED PRIMARY KEY,
  current_product_id INT UNSIGNED FOREIGN KEY;
  related_product_id INT UNSIGNED;
);

CREATE TABLE [IF NOT EXISTS] features (
  feature_id INT UNSIGNED PRIMARY KEY,
  product_id INT UNSIGNED FOREIGN KEY;
  feature VARCHAR(127);
  value VARCHAR(127);
);

CREATE TABLE [IF NOT EXISTS] styles (
  style_id INT UNSIGNED PRIMARY KEY,
  product_id INT UNSIGNED FOREIGN KEY;
  name VARCHAR(127);
  sale_price DECIMAL(9,2);
  original_price DECIMAL(9,2);
  default_style TINYINT(1);
);

CREATE TABLE [IF NOT EXISTS] photos (
  photo_id INT UNSIGNED PRIMARY KEY,
  style_id INT UNSIGNED FOREIGN KEY;
  url VARCHAR(MAX);
  thumbnail_url VARCHAR(MAX);
);

CREATE TABLE [IF NOT EXISTS] skus (
  sku_id INT UNSIGNED PRIMARY KEY,
  style_id INT UNSIGNED FOREIGN KEY;
  size VARCHAR(31);
  quantity SMALLINT;
);
