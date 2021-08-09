const express = require('express')
const app = express()
const PORT = 3000;
const db = require('../db/index.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/reviews', db.getProductReviews)


app.get('/reviews/meta', db.getMeta)
app.post('/reviews')
app.put('/reviews/:review_id/helpful')
app.put('/reviews/:review_id/report')

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})

module.exports = app;