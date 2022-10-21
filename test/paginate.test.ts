import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { PrismaClient, User } from '@prisma/client';

import { paginate } from '../src/index';
import { Paginated } from '../src/types/Pagination';
import { DataBaseUtils } from './utils/DataBase.utils';

const prisma = new PrismaClient();

describe('paginate-prisma lib', () => {
  beforeAll(async () => await DataBaseUtils.seed(prisma));
  afterAll(async () => await DataBaseUtils.drop(prisma));

  describe('return attributes', () => {
    let paginated: Paginated<User>;

    beforeAll(async () => {
      paginated = await paginate<PrismaClient, User>(prisma, 'user', {});
      console.log(paginated);
    });

    it("Should have a 'data' array of values", async () => {
      expect(paginated.data.length).not.toBe(0);
    });

    it("Should return a 'pages' array of values", async () => {
      expect(paginated.pages).not.toBe(0);
    });

    it("Should return a 'page' array of values", async () => {
      expect(paginated.page).not.toBe(0);
    });

    it("Should return a 'limit' array of values", async () => {
      expect(paginated.limit).not.toBe(0);
    });

    it("Should return a 'items' array of values", async () => {
      expect(paginated.items).not.toBe(0);
    });
  });

    expect(results.data.length).not.toBe(0);
  });
});
