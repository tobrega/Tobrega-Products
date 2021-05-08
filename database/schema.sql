DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS related;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;

CREATE TABLE IF NOT EXISTS product (
  product_id INTEGER PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price FLOAT8
);

CREATE TABLE IF NOT EXISTS related (
  relationship_id INT PRIMARY KEY,
  current_product_id INT,
  related_product_id INT
);

CREATE TABLE IF NOT EXISTS features (
  feature_id INT PRIMARY KEY,
  product_id INT,
  feature TEXT,
  value TEXT
);

CREATE TABLE IF NOT EXISTS styles (
  style_id INT PRIMARY KEY,
  product_id INT,
  name TEXT,
  sale_price FLOAT8,
  original_price FLOAT8,
  default_style BOOLEAN
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id INT PRIMARY KEY,
  style_id INT,
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE IF NOT EXISTS skus (
  sku_id INT PRIMARY KEY,
  style_id INT,
  size TEXT,
  quantity SMALLINT
);

COPY product FROM '/Users/brentonhershner/sw/hr/SDC/Tobrega-Products/data/cleaned/product.csv' WITH delimiter ',' NULL AS 'null' csv header;
COPY related FROM '/Users/brentonhershner/sw/hr/SDC/Tobrega-Products/data/cleaned/related.csv' WITH delimiter ',' NULL AS 'null' csv header;
COPY features FROM '/Users/brentonhershner/sw/hr/SDC/Tobrega-Products/data/cleaned/features.csv' WITH delimiter ',' NULL AS 'null' csv header;
COPY styles FROM '/Users/brentonhershner/sw/hr/SDC/Tobrega-Products/data/cleaned/styles.csv' WITH delimiter ',' NULL AS 'null' csv header;
COPY photos FROM '/Users/brentonhershner/sw/hr/SDC/Tobrega-Products/data/cleaned/photos.csv' WITH delimiter ',' NULL AS 'null' csv header;
COPY skus FROM '/Users/brentonhershner/sw/hr/SDC/Tobrega-Products/data/cleaned/skus.csv' WITH delimiter ',' NULL AS 'null' csv header;
