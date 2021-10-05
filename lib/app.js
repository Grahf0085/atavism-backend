import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import adventurerController from './controllers/toons.js';
import recipeController from './controllers/recipes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi there');
});

app.use(adventurerController);
app.use(recipeController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);


export default app;
