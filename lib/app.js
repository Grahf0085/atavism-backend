import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import blattodeaController from './controllers/toons.js';

const app = express();

app.use(express.json());

app.use(blattodeaController);


app.use(notFoundMiddleware);
app.use(errorMiddleware);


export default app;
