const request = require('supertest');
const express = require('express');

const app = express();

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

//transformation functions within routes


// app.get('/user', function(req, res) {
//   res.status(200).json({ name: 'john' });
// });

// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });

// const express = require('../servers');
// const supertest = require('supertest');
// const request = supertest(express.app);
// describe('test', () => {
//   test('responds to a get request with the correct content type ', (done) => {
//     request.get('/qa/questions?product_id=1&page=1')
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         expect(JSON.parse(res.text).results.length).toBe(5);
//         return done();
//       })
//   });
//   afterAll(() => {
//     express.server.close();
//     express.db.connection.close();
//   });
// })