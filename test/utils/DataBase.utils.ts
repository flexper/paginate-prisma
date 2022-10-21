import { faker } from '@faker-js/faker';
import { PrismaClient, PrismaPromise, User } from '@prisma/client';

export class DataBaseUtils {
  static seed = async (prisma: PrismaClient, nb = 5) => {
    const prismaPromises: PrismaPromise<User>[] = [];

    for (let i = 0; i < nb; i++) {
      prismaPromises.push(
        prisma.user.create({
          data: {
            email: faker.internet.email(),
            name: faker.name.firstName(),
          },
        })
      );
    }

    await prisma.$transaction(prismaPromises);
  };

  static drop = async (prisma: PrismaClient) => {
    await prisma.user.deleteMany();
  };
}
