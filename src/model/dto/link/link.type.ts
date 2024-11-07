import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LinkType {
  @Field(() => Int)
  id: number;

  @Field()
  originalUrl: string;

  @Field()
  reducedUrl: string;

  @Field()
  title: string;

  @Field()
  frequency: number;
}
