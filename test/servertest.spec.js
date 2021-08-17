const request = require('supertest');
const express = require('express');

const server = require('../servers/index.js')

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

afterAll(done => {
  done();
});

describe('GET request to /reviews', () => {
  test('It should respond with a 200 status', async () => {
    const response = await request(server).get('reviews/?product_id=2000');
    expect(response.statusCode).toBe(200);
  });

  test('The response should contain data', async () => {
    const response = await request(server).get('reviews/?review_id=2000');
    expect(response.body).not.toBe(undefined);
  });

  test('The response should have the correct shape', async () => {
    const response = await request(server).get('reviews/?review_id=2000');
    expect(response.body.product).not.toBe(undefined);
    expect(response.body.page).not.toBe(undefined);
    expect(response.body.count).not.toBe(undefined);
    expect(response.body.results).not.toBe(undefined);
  });

  test('The response should return up to 5 results as a default', async () => {
    const response = await request(server).get('reviews/?review_id=2000');
    expect(response.body.results.length).toBeLessThanOrEqual(5);
  });

  // test('The response should return correctly formatted review data', async () => {
  //   const response = await request(server).get('reviews/?review_id=2000');
  //   expect(response.body.results[0].review_id).toBeInstanceOf(integer);
  //   expect(response.body.results[0].rating).toBeInstanceOf(integer);
  //   expect(response.body.results[0].summary).toBeInstanceOf(string);
  //   expect(response.body.results[0].recommend).toBeInstanceOf(boolean);
  //   expect(response.body.results[0].body).toBeInstanceOf(string);
  //   expect(response.body.results[0].date).toBeInstanceOf(string);
  //   expect(response.body.results[0].reviewer_name).toBeInstanceOf(string);
  //   expect(response.body.results[0].reviewer_name).toBeInstanceOf(integer);

  //   //specific test for photos

  // });
});

////////////////////////////////////////////////////////////

describe('GET request to /reviews/meta', () => {
  test('It should respond with a 200 status', async () => {
    const response = await request(server).get('/reviews/meta');
    expect(response.statusCode).toBe(200);
  });

  test('The response should contain data', async () => {
    const response = await request(server).get('/reviews/meta');
    expect(response.body).not.toBe(undefined);
  });
});

////////////////////////////////////////////////////////////

describe('POST request to /reviews', () => {
  test('It should respond with a 200 status', async () => {
    const response = await request(server).post('/reviews');
    expect(response.statusCode).toBe(200);
  });

  test('The response should contain data', async () => {
    const response = await request(server).post('/reviews');
    expect(response.body).not.toBe(undefined);
  });
});


describe('PUT request to /reviews/:review_id/helpful', () => {
  test('It should respond with a 200 status', async () => {
    const response = await request(server).put('/reviews/:review_id/helpful');
    expect(response.statusCode).toBe(200);
  });

  test('The response should contain data', async () => {
    const response = await request(server).put('/reviews/:review_id/helpful');
    expect(response.body).not.toBe(undefined);
  });
});

describe('PUT request to /reviews/:review_id/report', () => {
  test('It should respond with a 200 status', async () => {
    const response = await request(server).put('/reviews/:review_id/report');
    expect(response.statusCode).toBe(200);
  });

  test('The response should contain data', async () => {
    const response = await request(server).put('/reviews/:review_id/report');
    expect(response.body).not.toBe(undefined);
  });
});
