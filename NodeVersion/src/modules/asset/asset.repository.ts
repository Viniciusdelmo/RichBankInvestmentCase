import prisma from '../../database/prismaClient';
import { Asset } from './asset.types';

export const createAsset = async (data: Omit<Asset, 'id'>): Promise<Asset> => {
  const created = await prisma.asset.create({ data });
  return created as unknown as Asset;
};

export const findAssetByTicker = async (ticker: string): Promise<Asset | null> => {
  return (await prisma.asset.findUnique({ where: { ticker } })) as unknown as Asset | null;
};

export const findAllAssets = async (): Promise<Asset[]> => {
  return (await prisma.asset.findMany()) as unknown as Asset[];
};

