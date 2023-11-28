import express from "express"
import cors from 'cors'

import quotesRouter from './routes/quotesRoutes'


const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credential: true
}

// INITIALIZE //
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))

// MIDDLEWARES //

// ROUTES //
app.use('/quotes', quotesRouter)

export default app