import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(() => Boolean, { description: 'Indicates if there are more pages to fetch.' })
  hasNextPage: boolean;

  @Field(() => Boolean, { description: 'Indicates if there are previous pages.' })
  hasPreviousPage: boolean;

  @Field(() => String, { nullable: true, description: 'The cursor for the start of this page.' })
  startCursor: string | null;

  @Field(() => String, { nullable: true, description: 'The cursor for the end of this page.' })
  endCursor: string | null;

  constructor(hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, endCursor: string | null) {
    this.hasNextPage = hasNextPage;
    this.hasPreviousPage = hasPreviousPage;
    this.startCursor = startCursor;
    this.endCursor = endCursor;
  }
}
