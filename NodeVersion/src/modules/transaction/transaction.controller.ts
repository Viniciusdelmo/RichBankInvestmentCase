import { Router, Request, Response, NextFunction } from 'express';
import { createTransaction as svcCreate } from './transaction.service';
import { createTransactionSchema } from './transaction.schema';
import { findAllTransactions } from './transaction.repository';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createTransactionSchema.parse(req.body);
    const created = await svcCreate(parsed);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '20', type } = req.query;
    const pageNum = Number(page);
    const limNum = Number(limit);
    const txs = await findAllTransactions(type ? { type } : undefined, pageNum, limNum);
    res.json(txs);
  } catch (err) {
    next(err);
  }
});

export default router;

