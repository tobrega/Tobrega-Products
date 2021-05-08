import express from 'express';
import morgan from 'morgan';

const app = express();

const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
