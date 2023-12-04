import express from 'express';
import cors from 'cors';

import quotesRouter from './routes/quotesRoutes';

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credential: true,
};

// INITIALIZE //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// MIDDLEWARES //

// ROUTES //

// ROOT ROUTE //
app.get('/', (req, res) => {
  res.send('Welcome to the MS node server');
});

app.use('/quotes', quotesRouter);

export default app;
