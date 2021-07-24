const express = require('express')
const app = express()
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + "/../client/dist"));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/reviews/')
app.get('/reviews/meta')
app.post('/reviews')
app.put('/reviews/[review_id]/helpful')
app.put('/reviews/[review_id]/report')
app.listen(port, () => {
  console.log(`listening on port ${PORT}`);
})