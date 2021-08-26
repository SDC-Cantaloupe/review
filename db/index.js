const helper = require('../db/helper.js')
const { Pool } = require('pg')
const redis = require('redis')
const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);
require('dotenv').config();




const pool = new Pool ({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: 5432,
});
const cache = (req, res, next) => {
  client.get(req.query.product_id, (err, data) => {
    if(err) throw err;
    if(data !== null) {
      res.send(data)
    } else {
        next()
    }
   })
};


const getProductReviews = (req, res) => {
  console.log('made it')

  const query = {
    text: `SELECT reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, reviews_photos.url from reviews
    LEFT JOIN reviews_photos ON reviews.id = reviews_photos.review_id
    WHERE reviews.product_id = $1 AND reviews.reported = 'false' ORDER BY reviews.helpfulness DESC LIMIT $2;`,
    values: [req.query.product_id | 2, req.query.count | 100]
  }
  pool.query(query)
  .then(result => {
    var formatted = helper.formatReviews(req.query.product_id | 2, req.query.page | 1, req.query.count | 5, result.rows)
    client.setex(req.query.product_id, formatted)
    res.send(formatted)
  })
  .catch(err => {
    throw err;
  })

};

const getMeta = (req, res) => {
  console.log('made it to meta')
  console.log(req.query)
  var product_id = req.query.product_id
  const query = {
    text: `SELECT t1.rating, t1.recommend, t3.id, t3.name, t2.characteristic_id, t2.value from reviews t1
    INNER JOIN characteristic_reviews t2 ON t1.id = t2.review_id
    INNER JOIN characteristics t3 ON t2.characteristic_id = t3.id
    WHERE t1.product_id = $1;`,
    values: [product_id]
  }

  pool.query(query)
  .then(result => {
    console.log('result', result.rows)
    var transformed = helper.formatMeta(product_id | 2, result.rows)
    res.send(transformed)
  })
  .catch(err => {
    console.log(err)
    throw err;
  })

};
const postReview = (req, res) => {
  console.log('made it')
  // var req.query = {
  //   'product_id': ,
  //   'rating': ,
  //   'date': ,
  //   'summary': ,
  //   'recommend': ,
  //   'response': ,
  //   'body': ,
  //   'reviewer_name': ,
  //   'email': ,
  //   'photos': ,
  //   'characteristics':
  // }
  const date = parseInt(new Date().toISOString());
  const query = {
    text: `INSERT INTO reviews (product_id, rating, date, summary, recommend, body, reviewer_name, reviewer_email, response, helpfulness, reported) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;`,
    values: [req.body.product_id, req.body.rating,date, req.body.summary, req.body.recommend, req.body.body, req.body.name, req.body.email, null, 0, 'false']
  }
  //fix date type bigint
  // INSERT INTO reviews_photos (review_id, url) VALUES (reviews.id, $9)
  pool.query(query)
  .then((results) => {
    const review_id = results.rows[0].id;

    if (req.body.photos.length) {
      req.body.photos.forEach(async (item) => {
        await pool.query(`INSERT INTO reviews_photos (review_id, url) VALUES (${review_id}, '${item}')`)
      })
    }
    return results
  })
  .then( async (results) => {
    const characteristics = req.body.characteristics;
    const review_id = results.rows[0].id;

    for (let key in characteristics) {
      await pool.query(`INSERT INTO characteristic_reviews (characteristic_id, review_id, value) VALUES (${key}, ${review_id}, '${characteristics[key]}')`)
    }
    res.sendStatus(204);
  })
  .catch(err => {
    throw err;
  })

};

const putHelpfulReview = (req, res) => {
  console.log('made it')
  var review_id = req.query.review_id
  const query = {
    text: `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1;`,
    values: [review_id]
  }
  pool.query(query)
  .then(result => {
    res.sendStatus(200)
  })
  .catch(err => {
    throw err;
  })

};
const putReportReview = (req, res) => {
  console.log('made it')
  var review_id = req.query.review_id
  const query = {
    text: `UPDATE reviews SET reported = true WHERE reviews.id = $1`,
    values: [review_id]
  }
  pool.query(query)
  .then(result => {
    res.sendStatus(200)
  })
  .catch(err => {
    throw err;
  })

};
module.exports = {
  getProductReviews,
  getMeta,
  postReview,
  putHelpfulReview,
  putReportReview,
  cache
}
