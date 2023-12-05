import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig';

import quotesRouter from './routes/quotesRoutes';
import checkRouter from './routes/healthCheck';

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

// SWAGGER SETUP //
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MIDDLEWARES //

// ROUTES //
app.use('/check', checkRouter);
app.use('/quotes', quotesRouter);
// ROOT ROUTE //
app.get('/', (req, res) => {
  res.send('Welcome to the MS node server');
});

export default app;
