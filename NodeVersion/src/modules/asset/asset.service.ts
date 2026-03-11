import { createAsset as repoCreateAsset, findAssetByTicker, findAllAssets } from './asset.repository';
import { CreateAssetInput } from './asset.schema';

export const createAsset = async (input: CreateAssetInput) => {
  const exists = await findAssetByTicker(input.ticker);
  if (exists) {
    const err: any = new Error('Ticker already exists');
    err.status = 400;
    throw err;
  }
  return await repoCreateAsset(input);
};

export const listAssets = async () => {
  return await findAllAssets();
};

