import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';

dotenv.config();

const app = express();
app.use(json());

app.get('/health', (req, res) => res.json({ ok: true }))

export default app;