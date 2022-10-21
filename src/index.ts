import { set } from 'lodash';

import { PaginationOptions } from './types/Pagination';

export const getPaginationsData = <T>(options: PaginationOptions<T> = {}) =>
  ({
    page: options.page || 1,
    limit: options.limit || 10,
  } as { page: number; limit: number });

export async function paginate<P, T>(
  prisma: P,
  model: Exclude<
    keyof P,
    | '$on'
    | '$connect'
    | '$disconnect'
    | '$use'
    | '$executeRaw'
    | '$executeRawUnsafe'
    | '$queryRaw'
    | '$queryRawUnsafe'
    | '$transaction'
  >,
  //TODO: find a way to remove ts ignore to autocomplete
  //@ts-ignore
  query: Exclude<
    //@ts-ignore
    Parameters<P[typeof model]['findMany']>[0],
    undefined
  >['where'],
  //TODO: Refacto to use dot notation to full indexation (see rosetty) to filter or sort by subfields (ex: user.role)
  options: PaginationOptions<keyof T> = {},
  additionalPrismaQuery?: Omit<
    //@ts-ignore
    Exclude<Parameters<P[typeof model]['findMany']>[0], undefined>,
    'where' | 'skip' | 'take' | 'orderBy'
  >
) {
  const { page, limit } = getPaginationsData<T>({
    page: options?.page,
    limit: options?.limit,
  });

  let orderBy = {};

  if (options.sort?.field) {
    const field = options.sort?.field;

    if ((field as string).indexOf('.') === -1) {
      orderBy = {
        [options.sort?.field]: options.sort?.order.toLowerCase(),
      };
    } else {
      const orderByValue = {};

      set(orderByValue, field, options.sort?.order.toLowerCase());
      orderBy = orderByValue;
    }
  }

  //@ts-ignore
  const data: T[] = await prisma[model].findMany({
    where: query,
    ...(options?.disablePagination
      ? {}
      : { skip: (page - 1) * limit, orderBy, take: limit }),
    ...additionalPrismaQuery,
  });

  //@ts-ignore
  const items = await prisma[model].count({
    where: query,
  });

  const pages = options?.disablePagination
    ? 0
    : Math.ceil((items || 0) / limit);

  return {
    data,
    pages,
    page,
    limit,
    items,
  };
}
