import { Max, Min } from 'class-validator';
import {
  Field,
  InputType,
  InterfaceType,
  registerEnumType,
} from 'type-graphql';

export enum PAGINATION_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}
registerEnumType(PAGINATION_ORDER, {
  name: 'PAGINATION_ORDER',
  description: undefined,
});

@InputType()
export class PaginationOrder<T> {
  @Field(() => String)
  field!: T;

  @Field(() => PAGINATION_ORDER, { defaultValue: PAGINATION_ORDER.ASC })
  order!: PAGINATION_ORDER;
}

@InputType()
export class PaginationOptions<T> {
  @Min(1)
  @Field({ defaultValue: 1, nullable: true })
  page?: number;

  @Field({ defaultValue: false, nullable: true })
  disablePagination?: boolean;

  @Min(1)
  @Max(20)
  @Field({ defaultValue: 10, nullable: true })
  limit?: number;

  @Field(() => PaginationOrder, { nullable: true })
  sort?: PaginationOrder<T>;
}

@InterfaceType()
export class PaginationResult {
  @Field()
  page!: number;

  @Field()
  pages!: number;

  @Field()
  limit!: number;

  @Field()
  items!: number;
}

export interface Paginated<T> extends PaginationResult {
  data: T[];
}
