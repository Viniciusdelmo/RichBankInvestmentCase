import { Router, Request, Response, NextFunction } from 'express';
import { createPortfolioSchema } from './portfolio.schema';
import { createPortfolio, listPortfolios, getPortfolioPosition } from './portfolio.service';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createPortfolioSchema.parse(req.body);
    const created = await createPortfolio(parsed);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await listPortfolios();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/position', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const portfolioId = typeof id === 'string' ? id : id?.[0];
    if (!portfolioId) {
      res.status(400).json({ error: 'Missing portfolio id' });
      return;
    }
    const pos = await getPortfolioPosition(portfolioId);
    res.json(pos);
  } catch (err) {
    next(err);
  }
});

export default router;

