import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m30s', target: 1000 }
  ]
};

export default function () {

  http.get(`http://localhost:3000/reviews/meta?product_id=${Math.floor(Math.random() * (5774952 - 1000000) + 1000000)}`, {
    tags: { name: 'getMeta'},
  });
  sleep(1);

}