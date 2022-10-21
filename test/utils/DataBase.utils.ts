import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export class DataBaseUtils {
  static seed = async (prisma: PrismaClient) => {
    await prisma.user.create({
      data: {
        id: 0,
        email: faker.internet.email(),
        name: faker.name.firstName(),
      },
    });

    await prisma.user.create({
      data: {
        id: 1,
        email: faker.internet.email(),
        name: faker.name.firstName(),
      },
    });
  };

  static drop = async (prisma: PrismaClient) => {
    await prisma.user.deleteMany({
      where: {
        id: {
          in: [0, 1],
        },
      },
    });
  };
}
