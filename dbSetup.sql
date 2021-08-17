
DROP DATABASE IF EXISTS reviewsdb;
CREATE DATABASE reviewsdb;

\c reviewsdb;

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews
(
  id SERIAL UNIQUE,
  pkey_id INTEGER NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  rating INTEGER NULL DEFAULT NULL,
  date VARCHAR NULL DEFAULT NULL,
  summary VARCHAR NULL DEFAULT NULL,
  body VARCHAR NULL DEFAULT NULL,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR NULL DEFAULT NULL,
  reviewer_email VARCHAR NULL DEFAULT NULL,
  response VARCHAR NULL DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS characteristics;
CREATE TABLE characteristics (
  id SERIAL UNIQUE,
  pkey_id INTEGER NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS characteristic_reviews;
CREATE TABLE characteristic_reviews
(
  id SERIAL UNIQUE,
  pkey_id INTEGER NULL DEFAULT NULL,
  characteristic_id INTEGER NULL DEFAULT NULL,
  review_id INTEGER NULL DEFAULT NULL,
  value INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS reviews_photos;
CREATE TABLE reviews_photos
(
  id SERIAL UNIQUE,
  pkey_id INTEGER NULL DEFAULT NULL,
  review_id INTEGER,
  url VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS product;
CREATE TABLE product
(
  id SERIAL UNIQUE,
  pkey_id INTEGER NULL DEFAULT NULL,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INTEGER,
  PRIMARY KEY (id)
);

-- COPY reviews(pkey_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/hackreactor/work/sdc/reviews.csv' DELIMITER ',' CSV HEADER;

-- COPY characteristics(pkey_id, product_id, name) FROM '/Users/hackreactor/work/sdc/characteristics.csv' DELIMITER ',' CSV HEADER;

-- COPY characteristic_reviews(pkey_id, characteristic_id, review_id, value) FROM '/Users/hackreactor/work/sdc/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

-- COPY reviews_photos(pkey_id, review_id, url) FROM '/Users/hackreactor/work/sdc/reviews_photos.csv' DELIMITER ',' CSV HEADER;

-- COPY product(pkey_id, name, slogan, description, category, default_price) FROM '/Users/hackreactor/work/sdc/product.csv' DELIMITER ',' CSV HEADER;
\COPY reviews(pkey_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/home/ubuntu/data/reviews.csv' DELIMITER ',' CSV HEADER;

\COPY characteristics(pkey_id, product_id, name) FROM '/home/ubuntu/data/characteristics.csv' DELIMITER ',' CSV HEADER;

\COPY characteristic_reviews(pkey_id, characteristic_id, review_id, value) FROM '/home/ubuntu/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

\COPY reviews_photos(pkey_id, review_id, url) FROM '/home/ubuntu/data/reviews_photos.csv' DELIMITER ',' CSV HEADER;

\COPY product(pkey_id, name, slogan, description, category, default_price) FROM '/home/ubuntu/data/product.csv' DELIMITER ',' CSV HEADER;


ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE reviews_photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES product (id);


-- CREATE INDEX review_idx on reviews(product_id);
-- CREATE INDEX photos_idx on reviews_photos(review_id);
-- CREATE INDEX chars_idx on characteristic_reviews(characteristic_id);
-- CREATE INDEX chars_reviews on characteristic_reviews(review_id);
-- CREATE INDEX chars_reviews_id on characteristics(product_id);

