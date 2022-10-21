import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { PrismaClient, User } from '@prisma/client';

import { paginate } from '../src/index';
import { DataBaseUtils } from './utils/DataBase.utils';

const prisma = new PrismaClient();

describe('Paginate testing', () => {
  beforeAll(async () => await DataBaseUtils.seed(prisma));
  afterAll(async () => await DataBaseUtils.drop(prisma));

  it("Should return a 'data' array of values", async () => {
    const results = await paginate<PrismaClient, User>('user', {});

    expect(results.data.length).not.toBe(0);
  });
});
