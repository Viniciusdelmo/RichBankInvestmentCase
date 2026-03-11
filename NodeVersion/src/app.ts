import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
app.use(json());

app.get('/health', (req, res) => res.json({ ok: true }))

app.use(errorHandler)

export default app;