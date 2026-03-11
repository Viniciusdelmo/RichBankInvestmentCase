import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import portfolioRouter from './modules/portfolio/portfolio.controller';
import assetRouter from './modules/asset/asset.controller';
import transactionRouter from './modules/transaction/transaction.controller';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
app.use(json());

app.get('/health', (req, res) => res.json({ ok: true }))
app.use('/portfolios', portfolioRouter);
app.use('/assets', assetRouter);
app.use('/transactions', transactionRouter);

app.use(errorHandler)

export default app;