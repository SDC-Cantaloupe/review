
-- DROP DATABASE IF EXISTS reviewsSDC;
-- CREATE DATABASE reviewsSDC

-- \c reviewsSDC;
-- //connect to DATABASE
-- // \c reviewsSDC
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
  id SERIAL PRIMARY KEY,
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

ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE reviews_photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);


-- reviewssdc=# \COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/hackreactor/work/sdc/reviews.csv' DELIMITER ',' CSV HEADER;
-- \COPY characteristic_reviews(id, characteristic_id, review_id, value) FROM '/Users/hackreactor/work/sdc/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
