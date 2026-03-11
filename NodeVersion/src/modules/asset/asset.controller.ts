import { Router, Request, Response, NextFunction } from 'express';
import { createAsset, listAssets } from './asset.service';
import { createAssetSchema } from './asset.schema';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createAssetSchema.parse(req.body);
    const created = await createAsset(parsed);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assets = await listAssets();
    res.json(assets);
  } catch (err) {
    next(err);
  }
});

export default router;

