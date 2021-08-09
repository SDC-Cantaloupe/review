
DROP DATABASE IF EXISTS reviewsdb;
CREATE DATABASE reviewsdb;

\c reviewsdb;

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews
(
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date BIGINT,
  summary VARCHAR,
  body VARCHAR,
  recommend VARCHAR,
  reported VARCHAR,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR,
  helpfulness INTEGER
);

DROP TABLE IF EXISTS characteristics;
CREATE TABLE characteristics
(
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR
);

DROP TABLE IF EXISTS characteristic_reviews;
CREATE TABLE characteristic_reviews
(
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER,
  review_id INTEGER,
  value INTEGER
);
DROP TABLE IF EXISTS reviews_photos;
CREATE TABLE reviews_photos
(
  rp_id SERIAL PRIMARY KEY,
  review_id INTEGER,
  url VARCHAR
);

DROP TABLE IF EXISTS product;
CREATE TABLE product
(
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INTEGER
);

COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/hackreactor/work/sdc/reviews.csv' DELIMITER ',' CSV HEADER;

COPY characteristics(id, product_id, name) FROM '/Users/hackreactor/work/sdc/characteristics.csv' DELIMITER ',' CSV HEADER;

COPY characteristic_reviews(id, characteristic_id, review_id, value) FROM '/Users/hackreactor/work/sdc/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

COPY reviews_photos(id, review_id, url) FROM '/Users/hackreactor/work/sdc/reviews_photos.csv' DELIMITER ',' CSV HEADER;

COPY product(id, name, slogan, description, category, default_price) FROM '/Users/hackreactor/work/sdc/product.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE reviews_photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES product (id);


-- CREATE INDEX review_idx on reviews(product_id);
-- CREATE INDEX photos on reviews_photos(review_id);
-- CREATE INDEX chars_id on characteristic_reviews(characteristic_id);
-- CREATE INDEX chars_reviews on characteristic_reviews(review_id);
-- CREATE INDEX chars_reviews_id on characteristics(product_id);

