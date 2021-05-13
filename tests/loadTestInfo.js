import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
  vus: 10,
  duration: '10s',
};

export default () => {
  const targetPercentiles = [0.05, 0.5, 0.95];
  const range = 0.05;
  const max = 1000000;

  targetPercentiles.forEach((percentile) => {
    const random = Math.floor(max * range * (Math.random() + percentile / range - 0.5));
    http.get(`http://localhost:3000/products/${random}`);
    sleep(1);
  });
};
