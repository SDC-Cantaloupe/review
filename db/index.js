const helper = require('../db/helper.js')
const { Pool } = require('pg')

const pool = new Pool ({
  user: 'hackreactor',
  host: 'localhost',
  database: 'reviewsdb',
  port: 5432
});


const getProductReviews = (req, res) => {
  console.log('made it')

  const query = {
    text: `SELECT reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, reviews_photos.url from reviews
    LEFT JOIN reviews_photos ON reviews.id = reviews_photos.review_id
    WHERE reviews.product_id = $1 AND reviews.reported = 'false' ORDER BY reviews.helpfulness DESC LIMIT $2;`,
    values: [req.query.product_id | 2, req.query.count + 10 | 100]
  }
  pool.query(query)
  .then(result => {
    var formatted = helper.formatReviews(req.query.product_id | 2, req.query.page | 1, req.query.count | 5, result.rows)
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
    values: [product_id | 2]
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
  // var valueObj = {
  //   'product_id': ,
  //   'rating': ,
  //   'date': ,
  //   'summary': ,
  //   'recommend': ,
  //   'response': ,
  //   'body': ,
  //   'date': ,
  //   'reviewer_name': ,
  //   'email': ,
  //   'photos': ,
  //   'characteristics':
  // }
  const query = {
    text: `
    INSERT INTO reviews
    (reviews.product_id, reviews.rating, reviews.date, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.email)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING reviews.id
    INSERT INTO reviews_photos (review_id, url) VALUES (reviews.id, $10)`,
    values: [valueObj.product_id, valueObj.rating, valueObj.date, valueObj.summary, valueObj.recommend, valueObj.response, valueObj.body, valueObj.date, valueObj.reviewer_name, valueObj.email]
  }
  pool.query(query)
  .then(result => {
    res.sendStatus(200)
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
  putReportReview
}
// require('dotenv').config();
// pool.connect((err) => {
  //   if (err) {
    //     console.log("Connection Failed: ", err);
    //   } else {
      //     console.log("Connected");
      //   }
      // });

      // pool.query('SELECT NOW()', (err, res) => {
        //   if (err) {
          //     console.log('ERR: ' + err.message);
          //   } else {
            //     console.log('Postgres db connected');
            //   }
            //   pool.end();
            // });