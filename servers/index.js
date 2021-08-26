const express = require('express')
const app = express()
const PORT = 4000;
const db = require('../db/index.js')
// const loaderiotoken = require('../loaderio.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/reviews', db.cache, db.getProductReviews)


app.get('/reviews/meta', db.getMeta)
app.post('/reviews', db.postReview)
app.put('/reviews/:review_id/helpful', db.putHelpfulReview)
app.put('/reviews/:review_id/report', db.putReportReview)
app.get('/loaderio-226dee531682ca90b7e97313e0a370f7/', (req, res) => {
  res.send('loaderio-226dee531682ca90b7e97313e0a370f7')

});

// app.get('/loaderio-226dee531682ca90b7e97313e0a370f7.txt', (req, res) => {
//   fs.readFile('../loaderio.js', (err,data) => {
//     res.send();
//   })

// });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
// app.listen(32, "3.101.22.67", function () {
//   console.log(`listening on `);
// })
module.exports = app;